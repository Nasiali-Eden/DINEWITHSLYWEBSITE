// Import Firebase SDKs (Ensure your script is type="module" in HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";




// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlzrGDlXrfLyHObwF2ey2i4-3wa2WKaYw",
    authDomain: "slyskitchen-403cc.firebaseapp.com",
    projectId: "slyskitchen-403cc",
    storageBucket: "slyskitchen-403cc.firebasestorage.app",
    messagingSenderId: "822961338193",
    appId: "1:822961338193:web:761f9caee519b87d2cc570",
    measurementId: "G-8G3QK91ME8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Run script after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get elements from the DOM
    const main = document.getElementById("main");
    const returnBtn = document.getElementById("return-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("submit");
    const signupButton = document.getElementById("sign-up");
    const signupEmailIn = document.getElementById("email-signup");
    const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
    const signupPasswordIn = document.getElementById("password-signup");
    const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
    const createacct = document.getElementById("create-acct");
    const createacctbtn = document.getElementById("create-acct-btn");

    // Log errors if any elements are not found (this helps debugging)
    if (!main) console.error("Element with id 'main' not found!");
    if (!returnBtn) console.error("Element with id 'return-btn' not found!");
    if (!emailInput) console.error("Element with id 'email' not found!");
    if (!passwordInput) console.error("Element with id 'password' not found!");
    if (!submitButton) console.error("Element with id 'submit' not found!");
    if (!signupButton) console.error("Element with id 'sign-up' not found!");
    if (!signupEmailIn) console.error("Element with id 'email-signup' not found!");
    if (!confirmSignupEmailIn) console.error("Element with id 'confirm-email-signup' not found!");
    if (!signupPasswordIn) console.error("Element with id 'password-signup' not found!");
    if (!confirmSignUpPasswordIn) console.error("Element with id 'confirm-password-signup' not found!");
    if (!createacct) console.error("Element with id 'create-acct' not found!");
    if (!createacctbtn) console.error("Element with id 'create-acct-btn' not found!");

    // Only add event listeners if elements exist
    if (createacctbtn && signupEmailIn && confirmSignupEmailIn && signupPasswordIn && confirmSignUpPasswordIn) {
        createacctbtn.addEventListener("click", function () {
            let isVerified = true;
            const signupEmail = signupEmailIn.value;
            const confirmSignupEmail = confirmSignupEmailIn.value;
            if (signupEmail !== confirmSignupEmail) {
                window.alert("Email fields do not match. Try again.");
                isVerified = false;
            }
            const signupPassword = signupPasswordIn.value;
            const confirmSignUpPassword = confirmSignUpPasswordIn.value;
            if (signupPassword !== confirmSignUpPassword) {
                window.alert("Password fields do not match. Try again.");
                isVerified = false;
            }
            if (!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
                window.alert("Please fill out all required fields.");
                isVerified = false;
            }
            if (isVerified) {
                createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
                    .then((userCredential) => {
                        window.alert("Success! Account created.");
                        logEvent(analytics, 'sign_up', { method: 'Email' });
                        window.location = "index.html";
                    })
                    .catch((error) => {
                        window.alert("Error occurred. Try again.");
                        window.alert(error.message);
                    });
            }
        });
    }

    if (submitButton && emailInput && passwordInput) {
        submitButton.addEventListener("click", function () {
            const email = emailInput.value;
            const password = passwordInput.value;
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    window.alert("Success! Welcome back!");
                    logEvent(analytics, 'login', { method: 'Email' });
                    window.location = "index.html";
                })
                .catch((error) => {
                    window.alert("Error occurred. Try again.");
                    console.error(error.message);
                });
        });
    }

    if (signupButton && main && createacct) {
        signupButton.addEventListener("click", () => {
            main.style.display = "none";
            createacct.style.display = "block";
        });
    }

    if (returnBtn && main && createacct) {
        returnBtn.addEventListener("click", function () {
            main.style.display = "block";
            createacct.style.display = "none";
        });
    }
});
