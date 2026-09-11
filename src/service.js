const PartsAPI = {
  parts: [
    { id: 1, name: "Тормозные колодки", article: "TR-100", price: 25, quantity: 10 },
    { id: 2, name: "Масляный фильтр", article: "MF-500", price: 8, quantity: 25 },
    { id: 3, name: "Свеча зажигания", article: "SP-123", price: 15, quantity: 50 },
    { id: 4, name: "Амортизатор", article: "AM-700", price: 107, quantity: 8 },
    { id: 5, name: "Ремень ГРМ", article: "TB-200", price: 235, quantity: 15 },
    { id: 6, name: "Аккумулятор", article: "AK-900", price: 340, quantity: 5 },
  ],
  all: function () {
    return this.parts;
  },
  get: function (id) {
    const isPart = (p) => p.id === id;
    return this.parts.find(isPart);
  },
  delete: function (id) {
    const isNotDelPart = (p) => p.id !== id;
    this.parts = this.parts.filter(isNotDelPart);
    return true;
  },
  add: function (part) {
    if (!part.id)
      part = {
        ...part,
        id:
          this.parts.reduce((prev, current) => {
            return prev.id > current.id ? prev : current;
          }, 0).id + 1,
      };
    this.parts = [...this.parts, part];
    return part;
  },
  update: function (part) {
    const index = this.parts.findIndex((p) => p.id === part.id);
    if (index !== -1) {
      this.parts[index] = { ...part };
    }
    return part;
  },
};

export default PartsAPI;