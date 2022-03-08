export const state = () => ({
    hellow: 'vuex',
});

export const mutations = () => ({
    increment(state) {
        state.hellow = 'goodbye';
    }
});