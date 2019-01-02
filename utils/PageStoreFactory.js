import qs from 'qs';

/**
 * 管理页面 Store 模板
 */
export default class PageStoreFactory {
  
  constructor(store) {

    let defaultState = {
      setting: {
        label: '对象',
        name: 'object',
        plural: 'objects',
        preifx: '',
        showSearchBar: true,
        pageSizes: [10, 20 ,50],
      },
      schema: [],
      list: [],
      queryParam: {
        sortProp: null,
        sortOrder: null,
        searchProp: null,
        searchValue: null,
        filters: null,
        pageSize: 10
      },
      total: 0
    }

    let defaultGetters = {
      setting(state, getters) {
        return state.setting;
      },
      schema(state, getters) {
        return state.schema;
      },
      list(state, getters) {
        
        if(!state.list || !Array.isArray(state.list)) {
          return [];
        }

        let list = state.list.map(function(item, index) {
            item['index'] = index;      // 加入列表索引
            return item;
        });
    
        return list;
      },
      total(state, getters) {
        return state.total;
      },
      queryParam(state, getters) {
        return state.queryParam;
      }
    }

    let defaultMutations = {
      setQueryParam(state, newQueryParam) {
        state.queryParam = Object.assign({}, state.queryParam, newQueryParam);
      },
      setList(state, list) {
        state.list = list || [];
      },
      addItem(state, newItem) {
        state.list.unshift(newItem);
      },
      editItem(state, thisItem) {
        for(let index in state.list) {
          let item = state.list[index];
    
          if(item.id === thisItem.id) {
            state.list[index] = thisItem;
          }
        }
      },
      delItem(state, itemIndex) {
        let list = state.list;
        list.splice(itemIndex, 1);
      },
      delItems(state, itemIndexes) {
        let list = state.list;
    
        // 降序排序：保证后来删除的列表项不会因为索引发生变化而误删
        itemIndexes.sort().reverse();
    
        for(let index of itemIndexes) {
          list.splice(index, 1);
        }
      },
      setTotal(state, total) {
        state.total = total || 0;
      }
    }

    let defaultActions = {
      /*  获取列表  */
      async fetchList({ state, dispatch, commit }) {
        dispatch('query');
      },
      /*  添加列表项  */
      async addItem({ state, dispatch, commit }, newItem) {
        let { preifx, plural } = state.setting;
        let response = await this.$axios.post(`${preifx}/${plural}`, newItem);
        let data = response.data;

        if(!data) return false;
        if(!data.item || !data.total) return false;
        
        commit('addItem', data.item);
        commit('setTotal', data.total);
      },
      /*  修改列表项  */
      async editItem({ state, dispatch, commit }, thisItem) {
        let { preifx, plural } = state.setting;
        let response = await this.$axios.put(`${preifx}/${plural}/${thisItem.id}`, thisItem);
        let result = response.data;

        if(!result) return false;

        console.log('修改成功', response, result);
        commit('editItem', thisItem);
      },
      /*  删除列表项  */
      async delItem({ state, dispatch, commit }, thisItem) {
        let { preifx, plural } = state.setting;
        let response = await this.$axios.delete(`${preifx}/${plural}/${thisItem.id}`);
        let result = response.data;

        if(!result) return false;

        console.log('刪除成功');
        commit('delItem', thisItem.index);
      },
      /*  删除所选列表项  */
      async delItems({ state, dispatch, commit }, items) {
        let itemIds = [], itemIndexes = [];
    
        for(let item of items) {
          itemIds.push(item.id);
          itemIndexes.push(item.index); 
        }

        let { preifx, plural } = state.setting;
        let response = await this.$axios.post(`${preifx}/${plural}/batchDelete`, itemIds)
        let result = response.data;

        if(!result) return false;
  
        console.log('修改成功');
        commit('delItems', itemIndexes);
      },
      /*  搜索  */
      search({ dispatch }, searchValue) {
        dispatch('query');
      },
      /*  分页:改变每页记录数  */
      changePageSize({ state, dispatch, commit }, pageSize) {
        commit('setQueryParam', { pageSize });
        dispatch('query');
      },
      /*  分页:改变页码  */
      changePageIndex({ state, dispatch, commit }, pageIndex) {
        commit('setQueryParam', { pageIndex });
        dispatch('query');
      },
      /*  排序  */
      sort({ state, commit, dispatch }, queryParam) {
        commit('setQueryParam', queryParam);
        dispatch('query');
      },
      /*  查询  */
      async query({ state, dispatch, commit }, queryParam) {
        let {
          preifx,
          plural,
        } = state.setting;

        let query = {};

        // 合并查询参数
        Object.assign(query, state.queryParam, queryParam);

        // 清除空查询参数 
        for(let key in query) {
          if(!query[key]) {
            delete query[key];
          }
        }

        let queryString = qs.stringify(query);
        let response = await this.$axios.get(`${preifx}/${plural}?${queryString}`);
        let { list, total } = response.data;

        if(list && total) {
          commit('setList', list);
          commit('setTotal', total)
          return true;
        } else {
          return false;
        }

      },
      /*  筛选  */
      filter({ state, dispatch, commit }, filters) {

        // 预处理
        // 如果 过滤值是对象 则只传递对象中的 ID 属性
        for(let filterProp in filters) {
          filters[filterProp] = filters[filterProp].map(function(filter) {
            if(typeof filter === 'object' && filter.id) {
              return filter.id;
            } else {
              return filter;
            }
          });
        }

        commit('setQueryParam', { filters });
        dispatch('query')
      }
    }

    /*  预处理  */
    if(!store.state.setting.plural) {
      store.state.setting.plural = store.state.setting.name + 's';
    }

    /*  合并配置  */
    this.state = Object.assign({}, store.state, {
      setting: Object.assign({}, defaultState.setting, store.state.setting),
      schema: store.state.schema || [],
      list: store.state.list || [],
      queryParam: Object.assign({}, defaultState.queryParam, store.state.queryParam),
      total: defaultState.total
    })
    this.getters = Object.assign({}, defaultGetters, store.getters)
    this.mutations = Object.assign({}, defaultMutations, store.mutations)
    this.actions = Object.assign({}, defaultActions, store.actions)
  }

  generate() {
    let store = {
      state: this.state,
      getters: this.getters,
      mutations: this.mutations,
      actions: this.actions
    };

    return store;
  }
}