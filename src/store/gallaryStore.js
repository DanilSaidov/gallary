import { observable, action, makeObservable } from "mobx";

import items from "./db.json"; //временно
class gallaryStore {
  gallaryCategories = items.tasks;
  activeCategoryItems = null;
  showModalCategory = false;
  timer = 0;

  constructor() {
    makeObservable(this, {
      gallaryCategories: observable,
      activeCategoryItems: observable,
      showModalCategory: observable,
      setGallaryCategories: action,
      setActiveCategory: action,
      toggleModalCategory: action,
    });
  }

  setGallaryCategories = (items) => {
    this.gallaryItems = items;
  };

  setActiveCategory = (categoryId) => {
    this.activeCategoryItems = this.gallaryCategories.filter(
      (item) => item.categoryId === categoryId
    );
    this.showModalCategory = true;
  };

  toggleModalCategory = (bool) => {
    this.showModalCategory = bool;
  };
}
export default new gallaryStore();
