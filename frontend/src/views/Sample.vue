<template>
    <h1>Hello</h1>
    <h2 v-if="countries.length">{{countries[1].name}}</h2>
</template>

<script>
export default {
    name: 'Sample',
    data(){
        return{
            countries: []
        }
    },
    mounted(){
        this.$store.dispatch('activateLoader')
        fetch("https://api.sampleapis.com/countries/countries")
        .then(res => res.json())
        .then(result => {
        this.countries = result
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => this.$store.dispatch('deActivateLoader'));
    }
}
</script>

<style>

</style>