<script setup lang="ts">
import { onMounted, reactive, ref, toRef } from "vue";
import publicIp from "public-ip";
export interface InternalIp {
  name: string;
  addr: Address[];
}
export interface Address {
  address: string;
  family: string;
}
const pageData = reactive<{
  interface: InternalIp[];
}>({
  interface: [],
});
onMounted(() => {
  getIps();
});
function getIps() {
  getInternalIP();
  getPublicIp();
}
async function getInternalIP() {
  // @ts-ignore
  const result = window.preload.networkInterfaces();
  if (result) {
    for (let devName in result) {
      let iface = result[devName];
      let addrArray: Address[] = [];
      for (const index in iface) {
        const addr = iface[index];
        if (addr.address === "127.0.0.1" || addr.address === "::1") {
          continue;
        }
        addrArray.push({ address: addr.address, family: addr.family });
      }
      if (addrArray.length) {
        pageData.interface.push({ name: devName, addr: addrArray });
      }
    }
  }
}
async function getPublicIp() {
  let addrArray: Address[] = [];
  try {
    const result = await publicIp.v4();
    if (result) {
      addrArray.push({ address: result, family: "IPV4" });
    }
  } catch (error) {}
  try {
    const result = await publicIp.v6();
    if (result) {
      addrArray.push({ address: result, family: "IPV6" });
    }
  } catch (error) {}
  pageData.interface.push({ name: "广域网", addr: addrArray });
}
function copyHandler(data: Address) {
  utools.copyText(data.address);
  utools.showNotification("复制成功");
}
</script>
<template>
  <div v-for="item in pageData.interface" class="are">
    <div class="ip_line">
      <span class="label">{{ item.name }}:</span>
      <div class="ip_list">
        <div v-for="addr in item.addr" class="ip-addr">
          <span class="addr-label">{{ addr.address }}</span>
          <div class="addr-operation">
            <button class="copy-button" @click="copyHandler(addr)">复制</button>
            <!-- <span class="des">复制成功</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.are {
  display: block;
  margin-left: 5%;
  padding-top: 1%;
  border-bottom: #dadada;
  border-bottom-width: 1px;
  border-bottom-style: dashed;
}

.ip_line {
  .label {
    color: cadetblue;
  }
  .ip_list {
    margin-left: 3em;
    margin-top: 1em;
    .ip-addr {
      margin: 0.5em 0;
      .addr-operation {
        margin-left: 1em;
        float: right;
        .copy-button {
          border: 0;
          border-radius: 4px;
          height: 20px;
          cursor: pointer;
        }
        .copy-button:hover {
          background: #12dddd;
        }
        .des {
          color: rgb(166, 166, 171);
          font-size: 0.7rem;
          margin-left: 20px;
        }
      }
    }
    // .ip-addr:hover {
    //   background-color: #dadada;
    // }
  }
}
</style>
