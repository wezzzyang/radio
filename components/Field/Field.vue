<template>
  <el-form-item
    :label="field.label" 
    :prop="field.prop">
    <!--  数字类型  -->
    <template v-if="field.template == 'number'">
      <el-input 
        :disabled="field.readonly"
        v-model="inputValue"
        @change="change"/>
    </template>
    <!--  下拉菜单类型  -->
    <template v-else-if="field.template == 'select'">
      <el-select 
        v-model="inputValue"
        :disabled="field.readonly"
        :placeholder="`请选择${field.label}`"
        :value-key="field.valueKey"
        @change="changeOption">
        <el-option
          v-for="item in field.options"
          :key="item.value"
          :label="item.label"
          :value="item[field.valueKey || 'value']"/>
      </el-select>
    </template>
    <!--  颜色下拉菜单类型  -->
    <template v-else-if="field.template == 'selectColor'">
      <el-select
        v-model="inputValue" 
        :disabled="field.readonly"
        :placeholder="`请选择${field.label}`"
        @change="change">
        <el-option
          v-for="item in field.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span :style="`color: ${item.value};`">{{ item.label }}</span>
        </el-option>
      </el-select>
    </template>
    <!--  默认类型  -->
    <template v-else>
      <el-input
        v-model="inputValue"
        :disabled="field.readonly"
        @change="change"
        @blur="blur"/>
    </template>
  </el-form-item>
</template>
<script>
export default {
  props: {
    value: {
      type: null,
      default() {
        return null;
      }
    },
    field: {
      type: Object,
      default() {
        return {
          label: '字段',
          prop: 'prop'
        }
      }
    }
  },
  data() {
    return {
      inputValue: null
    }
  },
  mounted() {
    if(typeof this.value === 'object' && this.value !== null) {
      let valueKey = this.field.valueKey || 'value';
      this.inputValue = this.value[valueKey];
    } else {
      this.inputValue = this.value
    }
  },
  methods: {
    change(value) {
      console.log(value);
      this.$emit('input', value);
    },
    changeOption(value) {
      let newValue = this.field.options.filter((option) => {
        return option[this.field.valueKey] == value;
      })[0];
      this.$emit('input', newValue);
    },
    blur() {
      
    }
  }
}
</script>