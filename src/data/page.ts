export const pageData = {
  numOfFriends: 500,
  resultPerPage: 25,
  minPage: 1,
  get maxPage() {
    return Math.ceil(this.numOfFriends / this.resultPerPage); // maximum of 500 friends
  }
};
