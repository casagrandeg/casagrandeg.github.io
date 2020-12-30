<template>
    <div>
        <h1>Hi {{account.user.name}} {{account.user.surname}}!</h1>
        <h3>Meteo Gardening:</h3>
        <em v-if="loading">Loading data...</em>
        <ul v-if="items">
            <li v-for="item in items" :key="item.code">
                <p>
                    {{item.code + " - " + item.city + ": "
                        + item.work_factor + "% (" + item.description + ")"}}
                </p>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    created () {
        // reset login status
        this.fnGetItems();
    },
    methods: {
        ...mapActions('userItems', ['getItems']),
        fnGetItems () {
            const email = this.account.user.email;
            this.getItems(email);
        }
    },
    computed: {
        ...mapState({
            account: state => state.account,
            items: state => state.userItems.items,
            loading: state => state.userItems.status.loading
        })
    },
};
</script>