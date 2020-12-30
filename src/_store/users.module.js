import { userService } from '../_services';

const state = {
    status: { loading: true },
    items: null
};

const actions = {
    getItems({ dispatch, commit }, email) {
        commit('getAllRequest');

        userService.getItems( { email })
            .then(
                items => commit('getAllSuccess', items),
                error => {
                    commit('getAllFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.status = { loading: true };
    },
    getAllSuccess(state, items) {
        state.status = { loading: false };
        state.items = items;
    },
    getAllFailure(state, error) {
        state.items = { error };
    }
};

export const userItems = {
    namespaced: true,
    state,
    actions,
    mutations
};
