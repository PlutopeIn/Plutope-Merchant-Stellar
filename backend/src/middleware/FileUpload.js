import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage }).fields([
    {
        name: "frontPhoto",
        maxCount: 1,
    },
    {
        name: "backPhoto",
        maxCount: 1,
    },
    {
        name: "logo",
        maxCount: 1,
    },
    {
        name: "coverPhoto",
        maxCount: 1,
    },
    {
        name: "image",
        maxCount: 1,
    },
]);

export default function (req, res, next) {
    upload(req, res, (error) => {
        if (error) {
            res.status(400).send(error);
        }

        const extractFileName = (fileKey) => req.files?.[fileKey]?.[0]?.filename || '';

        req.frontPhoto = extractFileName('frontPhoto');
        req.backPhoto = extractFileName('backPhoto');
        req.logo = extractFileName('logo');
        req.coverPhoto = extractFileName('coverPhoto');
        req.image = extractFileName('image');

        next()
    });
};
