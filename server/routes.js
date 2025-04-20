const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
const userApi = require('./api/user')
const Intro = require('./api/intro')
const Profile = require('./api/profile')
const Social = require('./api/social')
const Website = require('./api/website')
const socialMediaContext = require('./api/socialMediaContext')
const Feeds = require('./api/feed')
const Groups = require('./api/group')
const Names = require('./api/name')
const SaveUserSearch = require('./api/saveUserSearch')
const Months = require('./api/pastMonth')
const TimeZone = require('./api/timeZones')
const ActivityLog = require('./api/activityLog')
const AlertLibrary = require('./api/AlertLibrary')
const SaveAlertSearch = require('./api/saveAlertSearch')
const AddNewUser = require('./api/addNewUser')
const ReviewedHits = require('./api/reviewedHits')
const authApi = require('./api/auth');
const FileImage = require('./api/imageDownload');
const PDFShow = require('./api/pdfShow');
const EditFeed = require('./api/editFeed');
const Landing = require('./api/landing');
const Guest = require('./api/guest')

// new api
const Invoice = require('./api/invoice')
const CreateNewGroup = require('./api/availableFeeds')
const NewGroup = require('./api/createNewGroup')
const newAlertEvent = require('./api/newAlertEvent');
const notificationMethod = require('./api/notificationMethod');
const newAlert = require('./api/newAlert');
const peopleSay = require('./api/peopleSay.js');
const Password = require('./api/password.js');
const Help = require('./api/help.js');

// auth routes
router.route('/api-fake/auth/login').post(authApi.login);
router.route('/api-fake/auth/logout').post(authApi.logout);
router.route('/api-fake/auth/me').get(authApi.me);

router.route('/api-fake/login').post(userApi.login)
router.route('/api-fake/set-date-time').post(userApi.setDateTime)
router.route('/api-fake/auth-user').get(userApi.authUser)
router.route('/api-fake/users/check-email').post(userApi.checkEmail)
router.route('/api-fake/users/check-username').post(userApi.checkUserName)
router
  .route('/api-fake/users/phone-sendcode')
  .post(userApi.sendPhoneVerificationCode)
router.route('/api-fake/users/phone-verify').post(userApi.phoneVerify)
router.route('/api-fake/users/email-verify').post(userApi.emailVerify)
router.route('/api-fake/intro').get(Intro.intro)

router.route('/api-fake/profiles').post(Profile.getProfiles)

router.route('/api-fake/socials').get(Social.allSocials)
router.route('/api-fake/socials/:id').delete(Social.deleteSocial)
router.route('/api-fake/socials-status-change').put(Social.changeStatus)

router.route('/api-fake/websites').get(Website.getAllWebsite)
router.route('/api-fake/websites/:id').delete(Website.deleteWebsite)
router.route('/api-fake/websites-status-change').put(Website.changeStatus)

router.route('/api-fake/socials-media-context').get(socialMediaContext.getContexts)
router
  .route('/api-fake/user-save-search-wise-context/:id')
  .get(socialMediaContext.userSavedSearchWiseContext)

router.route('/api-fake/feeds').get(Feeds.getFeeds)
router.route('/api-fake/groups').get(Groups.getAllGroups)
router.route('/api-fake/names').get(Names.getAllNames)
router.route('/api-fake/past-months').get(Months.pastMonths)
router.route('/api-fake/save-user-search').get(SaveUserSearch.getUserSavedSearches)
router.route('/api-fake/save-user-search').post(SaveUserSearch.saveUserSearch)
router
  .route('/api-fake/save-user-search/:id')
  .get(SaveUserSearch.getSingleUserSavedSearch)
router
  .route('/api-fake/save-user-search/:id')
  .delete(SaveUserSearch.deleteUserSaveSearch)
router
  .route('/api-fake/save-user-search/:id')
  .put(SaveUserSearch.updateUserSavedSearch)

router.route('/api-fake/save-alert-search').post(SaveAlertSearch.saveAlertSearch)
router
  .route('/api-fake/save-alert-search')
  .get(SaveAlertSearch.getSavedAlertSearches)
router.route('/api-fake/save-alert-search/:id').get(SaveAlertSearch.getSingleAlert)
router
  .route('/api-fake/save-alert-search/:id')
  .put(SaveAlertSearch.updateAlertSearch)
router
  .route('/api-fake/save-alert-search-status/:id')
  .put(SaveAlertSearch.updateStatus)
router.route('/api-fake/save-alert-search/:id')
  .delete(SaveAlertSearch.deleteAlertSearch)
router.route('/api-fake/reviewed-hits/:id').get(ReviewedHits.getAllHits)
router.route('/api-fake/reviewed-hits/:id').put(ReviewedHits.updateNoteStatus)
// router.route('/api-fake/reviewed-hits/:id')
//   .put(ReviewedHits.updateNoteStatus)
router.route('/api-fake/reviewed-hits-make-as-reviewed/:id')
  .put(ReviewedHits.updateMakeAsReviewedStatus)
router
  .route('/api-fake/reviewed-hits-delete-alert/:id')
  .put(ReviewedHits.updateDeleteStatus)
router.route('/api-fake/time-zones').get(TimeZone.getTimeZones)
router.route('/api-fake/time-zone-wish-date-format/:id').get(TimeZone.getDates)
router.route('/api-fake/activity-logs').get(ActivityLog.getAllActivityLogs)
router
  .route('/api-fake/activity-logs-pdf-links')
  .get(ActivityLog.getAllDownloadLinks)

router.route('/api-fake/account/users').put(userApi.updateBillingInfo)
router.route('/api-fake/user/update-profile/:id').put(userApi.updateProfileInfo)

router.route('/api-fake/alertlibrary').get(AlertLibrary.getAlertLibrary)
router.route('/api-fake/imagedownload').get(FileImage.getImage)
router.route('/api-fake/pdfshow').get(PDFShow.getPDF)
router.route('/api-fake/addnewuser').post(AddNewUser.newUser)
router.route('/api-fake/getallusers').get(AddNewUser.getAllUsers)
router.route('/api-fake/closeaccountinfo/:id').get(userApi.getCloseAccountInfo)
router.route('/api-fake/add-new-user').post(AddNewUser.newUser)
router.route('/api-fake/update-new-user/:id').put(AddNewUser.updateProfile)
router.route('/api-fake/get-all-users').get(AddNewUser.getAllUsers)
router.route('/api-fake/close-account-info/:id').get(userApi.getCloseAccountInfo)
// router.route('/api-fake/imagedownload').get(FileImage.getImage)
// router.route('/api-fake/pdfshow').get(PDFShow.getPDF)
router.route('/api-fake/register').post(userApi.register)
// router.route('/api-fake/users').get(userApi.getAllUsers)

// new route
router.route('/api-fake/invoice-info').get(Invoice.getInvoiceInfo)
router.route('/api-fake/invoice-download').get(Invoice.downloadInvoice)
router.route('/api-fake/available-feeds').get(CreateNewGroup.getAvailableFeeds)
router.route('/api-fake/create-new-group').post(NewGroup.createGroup)
router.route('/api-fake/get-created-group').get(NewGroup.getcreatedGroup)
router.route('/api-fake/get-single-group/:id').get(NewGroup.getSingleGroup)
router.route('/api-fake/update-group/:id').put(NewGroup.updateGroup)
router.route('/api-fake/delete-group/:id').delete(NewGroup.deleteSelectedGroup)

router.route('/api-fake/new-system-alert-libraries').get(newAlertEvent.newSystemAlertLibrary)
router.route('/api-fake/new-alert-events').get(newAlertEvent.newAlertEvents)

router.route('/api-fake/notification-methods').get(notificationMethod.notificationMethods)
router.route('/api-fake/notifications').get(notificationMethod.notifications)

router.route('/api-fake/new-system-alerts').get(newAlert.getAllData)
router.route('/api-fake/new-system-alerts/status-change').put(newAlert.changeStatus)
router.route('/api-fake/new-system-alerts/store').post(newAlert.store)
router.route('/api-fake/new-system-alerts/:id').get(newAlert.show)
router.route('/api-fake/new-system-alerts/:id').put(newAlert.update)
router.route('/api-fake/new-system-alerts/delete/:id').delete(newAlert.deleteAlert)
router.route('/api-fake/bulk-socials').get(newAlert.socialBulkDownload)
router.route('/api-fake/bulk-websites').get(newAlert.websiteBulkDownload)
router.route('/api-fake/archive-bulk-download').post(newAlert.archiveBulkDownload)
router.route('/api-fake/alert-bulk-download').post(newAlert.alertBulkDownload)
router.route('/api-fake/show-edit-feed/:id').get(EditFeed.showEditFeed)
router.route('/api-fake/source-feeds').get(EditFeed.showAllSoucheFeeds)
router.route('/api-fake/update-existing-feed/:id').put(EditFeed.update)
router.route('/api-fake/send/access-request').post(EditFeed.sendAccessRequest)
router.route('/api-fake/check-feed-password').post(Profile.checkPassword)
router.route('/api-fake/save-archive-feeds').post(Profile.saveArchiveFeed)
router.route('/api-fake/cost').get(Profile.cost)

router.route('/api-fake/storage-rate').get(Profile.calculateStorageCosts)
router.route('/api-fake/user/create-new-account').post(Profile.CreateNewAccount)
router.route('/api-fake/user/payment').post(Profile.CreateNewUserPayment)
router.route('/api-fake/user/email-verify').post(Profile.emailVerify)
router.route('/api-fake/user/resend-email-code').post(Profile.resendEmailCode)
router.route('/api-fake/user/save-phone').post(Profile.savePhone)
router.route('/api-fake/user/resend-phone-code').post(Profile.sendPhoneCode)
router.route('/api-fake/user/phone-verify').post(Profile.phoneVerify)
router.route('/api-fake/user/storage').post(Profile.saveUserStorage)
router.route('/api-fake/user/archive-feeds').post(Profile.saveUserArchiveFeeds)
router.route('/api-fake/user/storage-costs').post(Profile.saveUserStorageCosts)
router.route('/api-fake/user/check-archive-feeds').get(Profile.checkArchiveFeeds)


router.route('/api-fake/about').get(Landing.about)
router.route('/api-fake/get/faq').get(Landing.faq)
router.route('/api-fake/reviews').get(peopleSay.peopleSay)
router.route('/api-fake/industries').get(Landing.industries)
router.route('/api-fake/get/key-features').get(Landing.willYouHelp)
router.route('/api-fake/feed-explanation').post(Landing.addFeedExplanation)
router.route('/api-fake/guest-faq').get(Guest.faq)
router.route('/api-fake/estimated-cost').get(Landing.estimatedCost)
router.route('/api-fake/get/features').get(Landing.features)
router.route('/api-fake/forgot-password').post(Password.forgotPassword)
router.route('/api-fake/verify-forgot-password-otp').post(Password.verifyForgotPasswordOtp)
router.route('/api-fake/password-reset').post(Password.passwordReset)


// help page 
router.route('/api-fake/help-about').get(Help.about)
router.route('/api-fake/help-faq').get(Help.faq)
router.route('/api-fake/help-question').post(Help.postQuestion)
router.route('/api-fake/help-problem').post(Help.problem)
router.route('/api-fake/help-contact').get(Help.contact)
router.route('/api-fake/help-troubleshoot').get(Help.troubleshoot)


module.exports = router
