export const FunctionComicSelected = (comicInfo, setComicSelected, setComicSelectedCharacters, setWriters, setPencilers, setEditors, setColorists, setDate) => {
    const firstItem = Array.isArray(comicInfo) ? comicInfo[0] : comicInfo;

    setComicSelected(firstItem);
    
    const comicInfoCharacters = firstItem.characters.items.map((comicCharacter) => comicCharacter.name);
    setComicSelectedCharacters(comicInfoCharacters);

    // console.log("Creators items:", firstItem.creators.items); // Verificar los elementos creadores

    firstItem.creators.items.forEach((item) => {
        // console.log("Role:", item.role, "Name:", item.name); // Verificar los roles y nombres de los creadores
        if (item.role === "writer") {
            setWriters((prevWriters) => [...prevWriters, item.name]);
        }
        if (item.role === "penciller" || item.role === "penciler") {
            setPencilers((prevPencilers) => [...prevPencilers, item.name]);
        }
        if (item.role === "editor") {
            setEditors((prevEditor) => [...prevEditor, item.name]);
        }
        if (item.role === "colorist") {
            setColorists((prevColorists) => [...prevColorists, item.name]);
        }
    });

    const fechaAPI = firstItem.dates[0].date;
    const fecha = new Date(fechaAPI);

    const opcionesDeFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate(fecha.toLocaleDateString('en-EN', opcionesDeFecha));

    console.log(WritableStream)
};
