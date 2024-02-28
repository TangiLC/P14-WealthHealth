# MyModal : composant React personnalisable

les props du composant permettent de personnaliser l'ensemble des éléments de la modale. En cas d'absence, le style par défault sera appliqué.

**overlayStyle** : le style du fond opaque masquant le fond de l'écran (personnalisation possible de _backgroundColor_ et _opacity_).

**modalStyle** : le style du cadre, la position et la taille de la fenêtre modale (personnalisation possible de
_top, left, transform_ pour la position - _border, borderRadius, padding, margin, backgroundColor, textAlign,_ ... pour le style -).

**closeStyle** : le style du bouton fermer, _width, height, borderRadius, backgroundColor, color, fontSize, fontWeight, textAlign, lineHeight_ ou _cursor_ peuvent être personnalisés.

**closeOffsetStyle** : pour le décalage du bouton fermer _top, right_ à modifier

**closeContent** permet de modifier le contenu du bouton fermer, x par défaut.

**titleStyle** s'occupe du style du titre de la modale (à personnaliser avec _color, fontSize, fontWeight, backgroundColor..._)

**modalTitle** est le texte à afficher pour le titre

**messageStyle** s'occupe du style du contenu de la modale (à personnaliser avec _color, fontSize, fontWeight, backgroundColor..._)

**modalMessage** est le texte à afficher dans la modale
**isModalOpen** est un booléen contrôlé par l'élément parent qui permet de définir si la modale est ouverte ou non.
**closeModal** est la fonction de rappel lié au booléen _isModalOpen_

Dans l'élément parent, il faut importer le hook useState de React, puis définir initialement

```bash
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal=()=>{setIsModalOpen(false)};
```

Puis insérer le composant MyModal à l'endroit souhaité avec au minimum :

```bash
    <MyModal modalTitle={""} modalMessage={""}
		isModalOpen={isModalOpen} closeModal={handleCloseModal} />
```

Et pour l'ensemble des personnalisations optionnelles:

```bash
    <MyModal modalStyle={...} overlayStyle={...}
        closeStyle={...} closeOffsetStyle={...} closeContent={""}
		modalTitle={""} titleStyle={...}
		modalMessage={""} messageStyle={""}
		isModalOpen={isModalOpen} closeModal={handleCloseModal} />
```
