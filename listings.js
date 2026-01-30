const Listing = require("../Models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
module.exports = {
    index: (async (req, res) => {
        const allListing = await Listing.find({});
        res.render("listings/index.ejs", { allListing });
    }),
    rendernewform: (async (req, res) => {
        res.render("listings/new.ejs");
    }),
    showListing: (async (req, res) => {
        let { id } = req.params;
        if (id) id = id.trim();
        const listing = await Listing.findById(id).populate("reviews");

        if (!listing) {
            // joi error handling
            throw new ExpressError(404, "Listing not found");
        }
        res.render("listings/show.ejs", { listing });
    }),
    createListing: (async (req, res) => {
        let url = req.file.path;
        let filename = req.file.filename;
        // console.log(url, filename);
        const newListing = new Listing(req.body.listing);
        newListing.image = { url, filename };
        // newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    }),
    renderEditForm: (async (req, res) => {
        let { id } = req.params;
        if (id) id = id.trim();
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        if (listing.image && listing.image.url) {
            listing.image.url = listing.image.url.replace("/upload", "/upload/w_250,h_250");
        }
        res.render("listings/edit.ejs", { listing });
    }),
    updateListing: (async (req, res) => {
        let { id } = req.params;
        if (id) id = id.trim();
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    }),
    deleteListing: (async (req, res) => {
        let { id } = req.params;
        if (id) id = id.trim();
        let deleteListing = await Listing.findByIdAndDelete(id);
        console.log(deleteListing);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    }),
}
