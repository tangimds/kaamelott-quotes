## Documentation de l'Api Kaamelott Quotes
Api production : [/api/v0](https://kaamelott-citations.fr/api/v0)


### Installation
```shell
git clone https://github.com/tangimds/kaamelott-quotes.git
cd kaamelott-quotes
npm i
```

### Requête
```
GET /
curl https://localhost:8080/api/v0
```
### Réponse
| Clé | Type | Description |
| --- | --- | --- |
| ok | Boolean | La requête s'est bien passée |
| data | Object | L'objet comprenant toutes les informations sur la citation |
| total | int | Le total de citations après filtrage |

#### Format de la citation
La citation se présente sous forme d'objet JSON.
| Clé | Type | Description |
| --- | --- | --- |
| id | int | Identifiant unique |
| quote | String | La réplique |
| author | String | Auteur _(Alexandre Astier)_ |
| actor | String | Acteur donnant la réplique |
| character | String | Personnage disant la réplique |
| series | String | La série _(Kaamelott)_ |
| season | String | Livre duquel la citation a été extraite |
| episode | String | Épisode duquel la citation a été extraite |

### Filtre
Il est possible de renseigner un filtre en paramètre url pour affiner la recherche...
> https://kaamelott-citations.fr/api/v0?character=kadoc

... ou plusieurs
> https://kaamelott-citations.fr/api/v0?character=kadoc&quote=compote

Certains champs peuvent être filtrés avec des synonymes :
| Clé | Synonyme |
| --- | --- |
| quote | text, citation |
| season | livre |
| character | personnage, perso |

### Format slack
Cette api peut être intégrée en tant qu'application slack ([voir documentation](https://api.slack.com/interactivity/slash-commands)).  
<img src="/assets/slack-response.png" alt="slack" height="120"/>

Le route a configurer dans l'application intégrée pour que la réponse soit correctement traitée par slack est la suivante : 

```
GET /slack
curl https://localhost:8080/api/v0/slack
```
### Réponse pour slack
| Clé | Type | Description |
| --- | --- | --- |
| responseType | String | `in_channel` |
| text | String | La réplique ainsi que les informations sur le personnage et l'épisode |

