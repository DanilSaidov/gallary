import { observable, action } from "mobx";
class gallaryStore {
  @observable items = [];
  @observable activeItem = null;

  @action
  setItems = (items) => {
    this.items = items;
  };
  @action
  setActiveItem = (el) => {
    this.activeItem = el;
  };
}
export default new gallaryStore();
