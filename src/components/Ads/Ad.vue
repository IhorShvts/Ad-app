<template>
    <v-container>
        <div class="card-layaout">
            <v-flex xs12>
                <v-card v-if="!loading">
                    <v-card-media
                            :src="ad.src"
                            height="300px">

                    </v-card-media>
                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-edit-app-modal class="mr-3" :ad="ad" v-if="isOwner"></app-edit-app-modal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
                <div v-else class="text-xs-center">
                    <v-progress-circular
                            indeterminate
                            :size="100"
                            :width="4"
                            color="primary">
                    </v-progress-circular>
                </div>
            </v-flex>
        </div>
    </v-container>
</template>

<script>
    import EditAdmodal from './EditAdModal';

    export default {
        props: ['id'],
        computed: {
            ad() {
                const id = this.id;
                return this.$store.getters.adById(id);
            },
            loading() {
                return this.$store.getters.loading
            },
            isOwner() {
                return this.ad.ownerId === this.$store.getters.user.id
            }
        },
        components: {
            appEditAppModal: EditAdmodal
        }
    }
</script>

<style scoped>
    .card-layaout {
        display: flex;
        flex-direction: row;
    }
</style>