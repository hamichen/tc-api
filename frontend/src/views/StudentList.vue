<template>
  <el-card class="card">

    <div class="title-row">
      <h2 class="title">學生名單</h2>

      <el-button type="primary" @click="syncData" :loading="syncing">
        {{ syncing ? "同步中..." : "同步資料" }}
      </el-button>
    </div>

    <!-- 下拉選單 -->
    <div class="filter-row">
      <el-select
        v-model="selectedGrade"
        placeholder="選擇年級"
        clearable
        @change="onGradeChange"
      >
        <el-option v-for="g in grades" :key="g" :label="g + ' 年級'" :value="g" />
      </el-select>

      <el-select
        v-model="selectedClass"
        placeholder="選擇班級"
        clearable
        :disabled="!classList.length"
        @change="loadStudents"
      >
        <el-option
          v-for="c in classList"
          :key="c.班序"
          :label="c.班名 + ' 班'"
          :value="c.班序"
        />
      </el-select>
    </div>

    <el-table :data="students" stripe border>
      <el-table-column prop="seat_no" label="座號" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="gender" label="性別" width="80" />
      <el-table-column prop="grade" label="年級" width="80" />
      <el-table-column prop="class_name" label="班級" width="80" />
      <el-table-column prop="student_no" label="學號" />
    </el-table>

  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const apiBase = "http://localhost:3001/api";

const students = ref([]);
const grades = ref([]);
const classMap = ref({});
const classList = ref([]);

const selectedGrade = ref(null);
const selectedClass = ref(null);

const syncing = ref(false);

async function loadClasses() {
  const resp = await axios.get(`${apiBase}/classes`);
  grades.value = resp.data.grades;
  classMap.value = resp.data.classes;
}

function onGradeChange() {
  selectedClass.value = null;
  students.value = [];
  classList.value = selectedGrade.value ? classMap.value[selectedGrade.value] : [];
}

async function loadStudents() {
  if (!selectedGrade.value || !selectedClass.value) return;
  const resp = await axios.get(
    `${apiBase}/students?grade=${selectedGrade.value}&class_seq=${selectedClass.value}`
  );
  students.value = resp.data;
}

async function syncData() {
  syncing.value = true;
  try {
    await axios.post(`${apiBase}/sync-school`);
    await loadClasses();
    selectedGrade.value = null;
    selectedClass.value = null;
    students.value = [];
    ElMessage.success("同步完成！");
  } catch (e) {
    ElMessage.error("同步失敗");
  } finally {
    syncing.value = false;
  }
}

onMounted(() => loadClasses());
</script>

<style scoped>
.card {
  padding: 20px;
  background: #fff7f0; /* 柔和奶油橘 */
  border-radius: 12px;
  border: 1px solid #f2e4d8;
}

/* 標題與按鈕排列 */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* 標題美化 — 暖棕色 */
.title {
  font-size: 26px;
  color: #8a4f32; /* 柔和暖棕 */
  margin: 0;
  font-weight: 600;
}

/* 下拉選單水平排列 */
.filter-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* ======== 元件配色微調（Element Plus）======== */

/* 下拉選單與表格標頭暖色調 */
:deep(.el-select .el-input__wrapper) {
  background-color: #fff3e6;    /* 淡橘 */
  border-color: #f2d3b7;
}

:deep(.el-table th) {
  background-color: #ffe8d6;    /* 柔橘表頭 */
  color: #8a4f32;
  font-weight: 600;
}

/* 表格列 hover */
:deep(.el-table__body tr:hover > td) {
  background-color: #fff4eb !important;
}

/* 同步按鈕暖色調 */
:deep(.el-button--primary) {
  background-color: #e89f68;
  border-color: #e89f68;
}

:deep(.el-button--primary:hover) {
  background-color: #d98b50;
  border-color: #d98b50;
}

/* 下拉選單選項 hover */
:deep(.el-select-dropdown__item:hover) {
  background-color: #ffe8d6;
}
</style>
