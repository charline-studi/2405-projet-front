class Home {
    constructor(){
        this.descriptionHTML = document.querySelector('.js-home-description')
        this.profilHTML = document.querySelector('.js-home-profil-url')
        this.avatarHTML = document.querySelector('.js-home-avatar')

        this.init()
    }

    init() {
        this.getUserInformations()
    } 

    getUserInformations() {
        // API façon #1 : Récupérer le contenu avec un fetch
        fetch("https://api.github.com/users/charline-studi")
            .then((response) => response.json())
            .then((data) => {
                this.updateHTML(data)
            })
            .catch((error) => {
                console.log("ERREUR lors de l'appel api", error)
            })
    } 

    updateHTML(APIdata) {
        // Afficher la description de mon profil Github
        this.descriptionHTML.textContent = APIdata.bio
        // Afficher l'url de mon profil github
        this.profilHTML.setAttribute("href", APIdata.html_url)
        // Afficher mon avatar
        this.avatarHTML.setAttribute("src", APIdata.avatar_url)
    }
}

export { Home }