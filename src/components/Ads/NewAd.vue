<template>
    <v-container>
        <div class="new-card-layaout">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new Ad</h1>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            name="title"
                            label="Ad title"
                            type="text"
                            v-model="title"
                            required
                            :rules="[v => !!v || 'Title is required']">

                    </v-text-field>
                    <v-text-field
                            name="description"
                            label="Ad description"
                            type="text"
                            v-model="description"
                            multi-line
                            :rules="[v => !!v || 'Description is required']">
                    </v-text-field>
                </v-form>
                <div>
                    <v-flex xs12>
                        <v-btn class="warning" @click="triggerUpload">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input
                                ref="fileInput"
                                type="file"
                                style="display: none"
                                accept="image/*"
                                @change="onFileChange">
                    </v-flex>
                </div>
                <div>
                    <v-flex xs12>
                        <img :src="src" height="100" v-if="src">
                    </v-flex>
                </div>
                <div>
                    <v-flex xs12>
                        <v-switch
                                v-model="promo"
                                label="Ad to promo ?"
                                color="primary"
                        ></v-switch>
                    </v-flex>
                </div>
                <div>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                                class="success"
                                :loading="loading"
                                @click="createAd"
                                :disabled="!valid || !image || loading">
                            Create ad
                        </v-btn>
                    </v-flex>
                </div>
            </v-flex>
        </div>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                promo: false,
                valid: false,
                image: null,
                src: ''
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            createAd() {
                if (this.$refs.form.validate() && this.image) {
                    //logic
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    };
                    this.$store.dispatch('createAd', ad)
                        .then(() => {
                            this.$router.push('/list')
                        })
                        .catch(() => {
                        })
                }
            },
            triggerUpload() {
                this.$refs.fileInput.click()
            },
            onFileChange(event) {
                const file = event.target.files[0];
                const reader = new FileReader(); // default library in JS
                reader.onload = e => {
                    this.src = reader.result
                };
                reader.readAsDataURL(file);
                this.image = file;
            }
        }
    }
</script>

<style scoped>
    .new-card-layaout {
        display: flex;
        flex-direction: row;
    }
</style>