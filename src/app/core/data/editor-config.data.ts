const EDITOR_CONFIG = {
  placeholder: 'Nhập nội dung',
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      'fontFamily',
      'fontSize',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      // 'highlight', <== Lỗi
      'fontColor',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'outdent',
      'indent',
      'alignment',
    ],
    shouldNotGroupWhenFull: false,
  },
};

export { EDITOR_CONFIG };
