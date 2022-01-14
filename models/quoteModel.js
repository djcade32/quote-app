class QuoteModel {
  constructor(id, userId, text, author, isFavorite) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.author = author;
    this.isFavorite = isFavorite;
  }
}

export default QuoteModel;
