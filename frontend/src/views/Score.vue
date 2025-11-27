<template>
  <el-card class="card">

    <div class="title-row">
      <h2 class="title">score</h2>
     <table>
      <tbody>
        <tr v-for="value in scoreData">
          <td>{{ value.學號 }}</td>
          <td>{{ value.姓名 }}</td>
        </tr>
      </tbody>
     </table>
    </div>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const apiBase = "http://localhost:3001/api";

const scoreData = ref([]);

async function getData() {
  const resp = await axios.get(
    `${apiBase}/score-semester`
  );
  const raw = resp.data.data || {};
  // 轉成陣列
  scoreData.value = Object.values(raw);
}
onMounted(() => getData());

</script>