<template>
    <v-container>
        <div class="list-layaout" v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Ad ads</h1>
                <v-card
                        class="elevation-10 mb-3"
                        v-for="ad of myAds"
                        :key="ad.id">
                    <div class="layaout-card">
                        <v-flex xs4>
                            <v-card-media :src="ad.src" height="160px"></v-card-media>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="info" :to="'/ad/' + ad.id">
                                    Open
                                </v-btn>
                            </v-card-actions>
                        </v-flex>
                    </div>
                </v-card>
            </v-flex>
        </div>
        <div class="list-layaout" v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="text-xs-center">
                <h1 class="text--primary">You have no ads</h1>
            </v-flex>
        </div>
        <div class="list-layaout" v-else>
            <v-flex xs12 class="text-xs-center">
            <v-progress-circular
                    indeterminate
                    :size="100"
                    :width="4"
                    color="primary">
            </v-progress-circular>
            </v-flex>
        </div>
    </v-container>
</template>

<script>
    export default {
        computed: {
            myAds () {
                return this.$store.getters.myAds
            },
            loading() {
                return this.$store.getters.loading
            },
        }
    }
</script>

<style scoped>
    .list-layaout {
        display: flex;
        flex-direction: row;
    }

    .layaout-card {
        display: flex;
        flex-direction: row;
    }
</style>