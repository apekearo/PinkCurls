import { IMLocalized } from './Core/localization/IMLocalization';

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;
const regexForAge = /[0-9]/g;

const DatingConfig = {
    isSMSAuthEnabled: true,
    appIdentifier: 'rn-dating-ios',
    onboardingConfig: {
        welcomeTitle: IMLocalized('Vaxidate'),
        welcomeCaption: IMLocalized('Match and chat with people you like from your area who you know are safe!'),
        walkthroughScreens: [
            {
                icon: require("../assets/images/fire-icon.png"),
                title: "Create a profile",
                description: IMLocalized("Swipe right to get a match with people you like from your area.")
            },
            {
                icon: require("../assets/images/instagram.png"),
                title: "Snap a pic of your Vaccination Report Card",
                description: IMLocalized("We use optical character recognition to verify your report card. Everyone on the platform will be verfied.")
            },
            {
                icon: require("../assets/images/chat.png"),
                title: "Private Messages",
                description: IMLocalized("Chat privately with people you match. Send photos, videos and gifs!")
            },
            {
                icon: require("../assets/images/notification.png"),
                title: "Get Notified",
                description: IMLocalized("Receive notifications when you get new likes, messages and matches.")
            }
        ]
    },
    editProfileFields: {
        sections: [
            {
                title: IMLocalized("PUBLIC PROFILE"),
                fields: [
                    {
                        displayName: IMLocalized("First Name"),
                        type: 'text',
                        editable: true,
                        regex: regexForNames,
                        key: 'firstName',
                        placeholder: 'Your first name'
                    },
                    {
                        displayName: IMLocalized("Last Name"),
                        type: 'text',
                        editable: true,
                        regex: regexForNames,
                        key: 'lastName',
                        placeholder: 'Your last name'
                    },
                    {
                        displayName: IMLocalized("Age"),
                        type: 'text',
                        editable: true,
                        regex: regexForAge,
                        key: 'age',
                        placeholder: 'Your age'
                    },
                    {
                        displayName: IMLocalized("Bio"),
                        type: 'text',
                        editable: true,
                        key: 'bio',
                        placeholder: 'Your bio'
                    },
                    {
                        displayName: IMLocalized("School"),
                        type: 'text',
                        editable: true,
                        key: 'school',
                        placeholder: 'Your bio'
                    }
                ]
            },
            {
                title: IMLocalized("PRIVATE DETAILS"),
                fields: [
                    {
                        displayName: IMLocalized("E-mail Address"),
                        type: 'text',
                        editable: false,
                        key: 'email',
                        placeholder: 'Your email address'
                    },
                    {
                        displayName: IMLocalized("Phone Number"),
                        type: 'text',
                        editable: true,
                        regex: regexForPhoneNumber,
                        key: 'phone',
                        placeholder: 'Your phone number'
                    }
                ]
            }
        ]
    },
    userSettingsFields: {
        sections: [
            {
                title: IMLocalized("DISCOVERY"),
                fields: [
                    {
                        displayName: IMLocalized("Show Me on Vaxidate"),
                        type: 'switch',
                        editable: true,
                        key: 'show_me',
                        value: true,
                    },
                    {
                        displayName: IMLocalized("Distance Radius"),
                        type: 'select',
                        options: ["5", "10", "15", "25", "50", "100", "unlimited"],
                        displayOptions: ["5 miles", "10 miles", "15 miles", "25 miles", "50 miles", "100 miles", "Unlimited"],
                        editable: true,
                        key: 'distance_radius',
                        value: "Unlimited",
                    },
                    {
                        displayName: IMLocalized("Gender"),
                        type: 'select',
                        options: ["female", "male", "none"],
                        displayOptions: ["Female", "Male", "None"],
                        editable: true,
                        key: 'gender',
                        value: "None",
                    },
                    {
                        displayName: IMLocalized("Gender Preference"),
                        type: 'select',
                        options: ["female", "male", "all"],
                        displayOptions: ["Female", "Male", "All"],
                        editable: true,
                        key: 'gender_preference',
                        value: "All",
                    }
                ]
            },
            {
                title: IMLocalized("PUSH NOTIFICATIONS"),
                fields: [
                    {
                        displayName: IMLocalized("New matches"),
                        type: 'switch',
                        editable: true,
                        key: 'push_new_matches_enabled',
                        value: true,
                    },
                    {
                        displayName: IMLocalized("Messages"),
                        type: 'switch',
                        editable: true,
                        key: 'push_new_messages_enabled',
                        value: true
                    },
                    {
                        displayName: IMLocalized("Super Likes"),
                        type: 'switch',
                        editable: true,
                        key: 'push_super_likes_enabled',
                        value: true
                    },
                    {
                        displayName: IMLocalized("Top Picks"),
                        type: 'switch',
                        editable: true,
                        key: 'push_top_picks_enabled',
                        value: true
                    }
                ]
            },
            {
                title: '',
                fields: [
                    {
                        displayName: IMLocalized("Save"),
                        type: 'button',
                        key: 'savebutton',
                    }
                ]
            }
        ]
    },
    contactUsFields: {
        sections: [
            {
                title: IMLocalized("CONTACT"),
                fields: [
                    {
                        displayName: IMLocalized("Address"),
                        type: 'text',
                        editable: false,
                        key: 'push_notifications_enabled',
                        value: "Silicon Valley, CA",
                    },
                    {
                        displayName: IMLocalized("E-mail us"),
                        value: 'support@vaxidate.com',
                        type: 'text',
                        editable: false,
                        key: 'email',
                        placeholder: 'Your email address'
                    }
                ]
            },
            {
                title: '',
                fields: [
                    {
                        displayName: IMLocalized("Call Us"),
                        type: 'button',
                        key: 'savebutton',
                    }
                ]
            }
        ]
    },
    contactUsPhoneNumber: "+9198865028"
};

export default DatingConfig;
