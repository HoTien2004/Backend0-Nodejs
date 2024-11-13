const path = require("path");

const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname , "../public/images/upload");

    // get image extension
    let extName = path.extname(fileObject.name);

    // get image's name (without extension)
    let baseName = path.basename(fileObject.name, extName);

    // create final path eg: /upload/your-image.png
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            status: "success",
            path: finalName,
            error: null
        }
    } catch (err) {
            return {
                status: "failed",
                path: null,
                error: JSON.stringify(err.message)
            }
    }
}

const uploadMultipleFiles = async (fileArr) => {
    try {
        let uploadPath = path.resolve(__dirname , "../public/images/upload");
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < fileArr.length; i++) {
            // get image extension
            let extName = path.extname(fileArr[i].name);

            // get image's name (without extension)
            let baseName = path.basename(fileArr[i].name, extName);

            // create final path eg: /upload/your-image.png
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                await fileArr[i].mv(finalPath);
                resultArr.push({
                    status: "success",
                    path: finalName,
                    fileName: fileArr[i].name,
                    error: null
                });
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: "failed",
                    path: null,
                    fileName: fileArr[i].name,
                    error: JSON.stringify(err.message)
                });
            }
        }
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (err) {
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(err.message)
        }
    }
}

module.exports = { uploadSingleFile, uploadMultipleFiles}