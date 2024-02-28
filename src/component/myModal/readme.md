# MyModal : composant React personnalisable

les props du composant permettent de personnaliser l'ensemble des éléments de la modale. En cas d'absence, le style par défault sera appliqué.

**overlayStyle** : le style du fond opaque masquant le fond de l'écran (personnalisation possible de *backgroundColor* et *opacity*).

**modalStyle** : le style du cadre, la position et la taille de la fenêtre modale (personnalisation possible de
*top, left, transform* pour la position - *border, borderRadius, padding, margin, backgroundColor, textAlign,* ... pour le style -).

**closeStyle** : le style du bouton fermer, *width, height, borderRadius, backgroundColor, color, fontSize, fontWeight, textAlign, lineHeight* ou *cursor* peuvent être personnalisés.

**closeOffsetStyle** : pour le décalage du bouton fermer *top, right* à modifier

**closeContent** permet de modifier le contenu du bouton fermer, x par défaut.

**titleStyle** s'occupe du style du titre de la modale (à personnaliser avec *color, fontSize, fontWeight, backgroundColor...*)

**modalTitle** est le texte à afficher pour le titre

**messageStyle** s'occupe du style du contenu de la modale (à personnaliser avec *color, fontSize, fontWeight, backgroundColor...*)

**modalMessage** est le texte à afficher dans la modale
	
**isModalOpen** est un booléen contrôlé par l'élément parent qui permet de définir si la modale est ouverte ou non.
	
**closeModal** est la fonction de rappel lié au booléen *isModalOpen* 

Dans l'élément parent, il faut définir initialement

```bash
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {setIsModalOpen(false)};
```

Puis insérer le composant MyModal à l'endroit souhaité avec

```bash
    <MyModal
					modalStyle={...} overlayStyle={...}
                    closeStyle={...} closeOffsetStyle={...} closeContent={""}
					modalTitle={""} titleStyle={...}
					modalMessage={""} messageStyle={""}
					isModalOpen={isModalOpen}
					closeModal={handleCloseModal}
				/>
```
