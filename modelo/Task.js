class Task {
  constructor(title, description, color, columna, id = null) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.color = color;
    this.columna = columna;
  }
}