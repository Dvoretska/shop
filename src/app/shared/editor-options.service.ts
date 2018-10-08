export class EditorOptionsService {
  optToolbar;
  constructor() {}

  initOptions() {
    this.optToolbar = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'size': ['small', 'large', 'huge'] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }]
    ];
  }
}
