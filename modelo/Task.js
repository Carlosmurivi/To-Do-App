class Task {
    constructor(title, description, color, columna) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.color = color;
        this.columna = columna;
    }
}