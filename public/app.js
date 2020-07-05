const app = new Vue({
    el: '#app',
    data: {
        NEW_SHORT_LINK: undefined,
        inputAlias: '',
        inputUrl: '',
        HOST_BASE: this.location.origin + "/",
        ERROR: undefined,
    },
    methods:{
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        shortenUrl: async () => {
            let alias = app.inputAlias;
            if(alias.length <= 0){
                alias = undefined;
            }
            await createShortUrl(
                app.inputUrl,
                alias
            );
        }
    }
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function createShortUrl(url, alias) {
    const res = await fetch('/api/url', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url,
            alias
        })
    });
    const body = await res.json();
    if(body.error !== undefined){
        if(body.error === "validation"){
            Vue.set(app, "ERROR", 'The inputs you made are not valid. Maybe you included some special chars?');
        } else {
            Vue.set(app, "ERROR", body.message);    
        }
        Vue.set(app, 'NEW_SHORT_LINK', undefined);
    } else {
        Vue.set(app, 'NEW_SHORT_LINK', body.alias);
        Vue.set(app, "ERROR", undefined);
    }
}
