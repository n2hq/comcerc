import { DefineRoutesFunction } from '@remix-run/dev/dist/config/routes';

export function setupRoutes(defineRoutes: DefineRoutesFunction) {
    return defineRoutes((route) => {
        route("/", "routes/_index.tsx");
        route("/:id", "routes/listing/index.tsx");
        route("/signin", "routes/signin/Signin.tsx");
        route("/signup", "routes/signup/Signup.tsx");
        route("/signup/code/:user_hash", "routes/signup/SignupCode.tsx");
        route("/signup/complete", "routes/signup/SignupComplete.tsx");
        route("/resetpw", "routes/resetpw/index.tsx");
        route("/resetpw/:user_guid", "routes/resetpw/resetpw.tsx")

        route("/landing/change_email", "routes/landing/change_email/index.tsx")
        route("/landing/reset_password/:guid", "routes/landing/reset_password/index.tsx")

        route("account", "routes/account/pages/home/index.tsx");
        route("account/add-business", "routes/account/pages/addbusiness/index.tsx");
        route("account/businesses", "routes/account/pages/businesses/index.tsx");
        route("account/businesses/:guid/:user_guid", "routes/account/pages/business/index.tsx");
        route("account/businesses/:business_guid/:user_guid/settings", "routes/account/pages/business/pages/settings/index.tsx");
        route("account/businesses/:business_guid/:user_guid/gallery", "routes/account/pages/business/pages/gallery/index.tsx");
        route("account/businesses/:business_guid/:user_guid/facilities", "routes/account/pages/business/pages/facilities/index.tsx");
        route("account/businesses/:business_guid/:user_guid/activate", "routes/account/pages/business/pages/activate/index.tsx");


        route("account/profile/:guid", "routes/account/pages/profile/index.tsx");
        route("account/email/:guid", "routes/account/pages/email/index.tsx");
        route("account/change-password/:guid", "routes/account/pages/changepw/index.tsx");
        route("account/reset-password/:guid", "routes/account/pages/resetpw/index.tsx");
        route("account/deactivate-user/:guid", "routes/account/pages/deactivateuser/index.tsx");

        route("api/users", "routes/api/users/index.tsx");
        route("api/users/:guid", "routes/api/users/user.tsx");
        route("api/users/signin", "routes/api/users/signin.tsx");
        route("api/users/verifytoken", "routes/api/users/verifytoken.tsx");
        route("api/users/change_password/:guid", "routes/api/users/change_password.tsx");
        route("api/users/reset_password_request", "routes/api/users/reset_password_request.tsx");
        route("api/users/reset_password/:guid", "routes/api/users/reset_password.tsx");
        route("api/users/change_email_request", "routes/api/users/change_email_request.tsx");
        route("api/users/change_email", "routes/api/users/change_email.tsx");
        route("api/users/activate_deactivate/:guid", "routes/api/users/activate_deactivate.tsx");
        route("api/users/user_by_user_hash/:user_hash", "routes/api/users/user_by_user_hash.tsx");
        route("api/users/verify_signup/:user_hash", "routes/api/users/verify_signup.tsx");


        route("api/users/user_profile_image/:guid", "routes/api/users/user_profile_image.tsx");
        route("api/listings/business_profile_image/:guid", "routes/api/listings/business_profile_image.tsx");

        route("api/listings", "routes/api/listings/index.tsx");
        route("api/listings/:guid_or_username", "routes/api/listings/listing.tsx");
        route("api/listings/search", "routes/api/listings/search.tsx");
        route("api/listings/owner/:guid", "routes/api/listings/owner/index.tsx");
        route("api/listings/gallery/:buid/:user_guid", "routes/api/listings/gallery.tsx");
        route("api/listings/operating_hours", "routes/api/listings/operating_hours.tsx");
        route("api/listings/sys_facility_features", "routes/api/listings/sys_facility_features/index.tsx");
        route("api/listings/selected_facility_features/:user_guid/:business_guid", "routes/api/listings/selected_facility_features/selected_facility_features.tsx");
        route("api/listings/selected_facility_features", "routes/api/listings/selected_facility_features/index.tsx");
        route("api/listings/activate/:user_guid/:business_guid", "routes/api/listings/activate/activate.tsx");
        route("api/listings/business_gallery/:business_guid", "routes/api/listings/business_gallery.tsx");
        route("api/listings/business_facility_features/:business_guid", "routes/api/listings/business_facility_features.tsx");
        route("api/listings/listing_by_category/:category/:limit", "routes/api/listings/listing_by_category.tsx");
        route("api/listings/featured_listing", "routes/api/listings/featured_listing.tsx");

        route("api/rating", "routes/api/ratings/index.tsx");
        route("api/rating/:user_guid/:business_guid", "routes/api/ratings/rating.tsx");
        route("api/rating/business_ratings/:business_guid", "routes/api/ratings/business_ratings.tsx");
        route("api/rating/ratings_reviews/:business_guid", "routes/api/ratings/ratings_reviews.tsx");

        route("api/util/state", "routes/api/util/state.tsx");
        route("api/util/country", "routes/api/util/country.tsx");
        route("api/util/city", "routes/api/util/city.tsx");
        route("api/util/category", "routes/api/util/category.tsx");

    });
}