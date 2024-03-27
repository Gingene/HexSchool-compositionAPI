<!-- 參考https://github.com/hl037/vue-contenteditable的寫法改寫 -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  tag: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', innerText: string): void;
}>();

const msg = ref('');

const editable = ref(true);

const element = ref<HTMLElement | null>();

// function currentContent() {
//   return element.value!.innerText;
// }

const updateContent = (newContent: string): void => {
  element.value!.innerText = newContent;
};

const handleInput = (): void => {
  if (element.value!.innerText === '') {
    msg.value = '如果事情完成了可以刪除，或是重新補上要做的事';
    return;
  } else {
    msg.value = '';
  }
  emit('update:modelValue', element.value!.innerText);
};

// function toggleEditable(): void {
//   editable.value = !editable.value;
//   // const range = window.getSelection()?.getRangeAt(0);
//   // range?.endOffset = range?.endContainer!.length;
//   // element.value?.focus();
//   // document.execCommand('selectAll', false, null);
//   // document.getSelection()!.selectAllChildren(element.value)?.collapseToEnd();
// }

onMounted(() => {
  updateContent(props.modelValue ?? '');
});
</script>

<template>
  <div class="relative">
    <component
      :is="tag"
      :contenteditable="editable"
      :class="editable ? 'text-center' : 'text-left'"
      @input="handleInput"
      ref="element"
    >
    </component>
    <div
      v-if="msg !== ''"
      class="absolute bg-background text-foreground left-1/2 bottom-full -translate-x-1/2 p-4 rounded-lg text-center w-[200px] md:w-[400px]"
    >
      {{ msg }}
    </div>
  </div>
</template>
