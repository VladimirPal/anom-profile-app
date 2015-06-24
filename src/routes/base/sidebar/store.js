import _ from 'lodash';
import Reflux from 'reflux';
import Actions from './actions';

let deepChange = (items, activeId) => {
  items.map((item, key) => {
    if (item.childrens) {
      if (_.findWhere(item.childrens, { 'id': activeId })) {
        item.isActive = true;
        item.isOpen = true;
      } else {
        item.isActive = false;
        item.isOpen = false;
      }
      deepChange(item.childrens, activeId);
    } else {
      item.isActive = activeId === item.id;
    }
  });
};

export default Reflux.createStore({
  listenables: Actions,

  onSetActive(activeId) {
    deepChange(this.menuItems, activeId);
    this.updateList();
  },

  onSwitchOpen(item) {
    item.isOpen = !item.isOpen;
    this.updateList();
  },

  getInitialState() {
    this.menuItems = [
      {
        id: "profiles",
        name: "Profiles",
        href: "#/",
        icon: "fa fa-child",
        role: "all"
      }
    ];

    return {menuItems: this.menuItems};
  },

  updateList() {
    this.trigger(this.menuItems);
  }
});
