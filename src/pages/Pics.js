// Import deps
import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "../components/SelectedImage";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// Create pics component
export default function Pics(props) {
    const [photos, setPhotos] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const [deleteFiles, setDeleteFiles] = useState([])


    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    useEffect(() => {

        function importAll(r) {
            return r.keys().map(r);
        }

        const imageData = importAll(require.context('../../public/headshots', false, /\.(png|jpe?g|svg)$/));
        imageData.sort(() => Math.random() - 0.5)

        for (let i = 0; i < props.data.length; i++) {
            let d = {}
            const element = imageData[i].split('/')
            var e = element[3].split('.')
            var f = e[0]

            d.src = `/headshots/${f}.png`
            d.height = 1
            d.width = 1

            setDeleteFiles(oldArray => [...oldArray, d.src])
            setPhotos(oldArray => [...oldArray, d])
        }

    }, [props.data])


    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
            />
        ),
        [selectAll]
    );

    const downloadData = async () => {
        var zip = new JSZip();


        // Create file containing original paths of images used. Those can be deleted with the included PowerShell script
        var deleteString = ""
        for (let i = 0; i < deleteFiles.length; i++) {
            deleteString += "C:\\Users\\Ryan\\Documents\\Projects\\fm-sqlite-app\\public" + deleteFiles[i].replaceAll('/', '\\') + "\n"
        }
        var configString = ""


        var img = zip.folder('images');
        for (let i = 0; i < photos.length; i++) {

            let buildString = `<record from="${props.data[i][0]}" to="graphics/pictures/person/${props.data[i][0]}/portrait"/>`
            configString += buildString + "\n"

            let src = photos[i].src
            // Fetch the image and parse the response stream as a blob
            const imageBlob = await fetch(src).then(response => response.blob());

            // create a new file from the blob object
            const imgData = new File([imageBlob], 'filename.png');

            // Copy-pasted from JSZip documentation
            img.file(`${props.data[i][0]}.png`, imgData, { base64: true });

        }
        zip.file('config.txt', configString);
        zip.file('deleteUsedPics.txt', deleteString)
        zip.file("deleteScript.txt", "Get-Content \"C:\\Users\\Ryan\\Downloads\\deleteUsedPics.txt\" | ForEach-Object {Remove-Item $_}")
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, 'example.zip');
        });

    }

    return (
        <div>
            <p>
                <button onClick={toggleSelectAll}>toggle select all</button>
                <button onClick={downloadData}>Download Data</button>
            </p>
            <Gallery photos={photos} renderImage={imageRenderer} />
        </div>
    );
}