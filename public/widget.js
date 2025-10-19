// /**
//  * PrivyAge Moca Widget
//  * A privacy-first age verification widget for web integration
//  */

// class PrivyAgeWidget {
//   constructor(options = {}) {
//     this.apiUrl = options.apiUrl || "http://localhost:3001/api/auth";
//     this.onVerified = options.onVerified || (() => {});
//     this.onError = options.onError || (() => {});
//     this.onLoginSuccess = options.onLoginSuccess || (() => {});
//     this.requiredAge = options.requiredAge || 18;
//     this.partnerId = options.partnerId || "your-partner-id";
//     this.theme = options.theme || "light";

//     this.isVisible = false;
//     this.overlay = null;
//     this.popup = null;
//   }

//   async show() {
//     if (this.isVisible) return;

//     this.createOverlay();
//     await this.createPopup();
//     this.isVisible = true;
//   }

//   hide() {
//     if (!this.isVisible) return;

//     if (this.overlay) {
//       document.body.removeChild(this.overlay);
//       this.overlay = null;
//     }

//     if (this.popup) {
//       document.body.removeChild(this.popup);
//       this.popup = null;
//     }

//     this.isVisible = false;
//   }

//   createOverlay() {
//     this.overlay = document.createElement("div");
//     this.overlay.style.cssText = `
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background-color: rgba(0, 0, 0, 0.5);
//       z-index: 9998;
//     `;

//     this.overlay.addEventListener("click", () => this.hide());
//     document.body.appendChild(this.overlay);
//   }

//   async createPopup() {
//     this.popup = document.createElement("div");
//     this.popup.style.cssText = `
//       position: fixed;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       background: white;
//       border-radius: 8px;
//       padding: 24px;
//       box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//       z-index: 9999;
//       min-width: 320px;
//       max-width: 400px;
//     `;

//     // Check authentication status first
//     let isAuthenticated = false;
//     let user = null;

//     try {
//       const profileResponse = await fetch(`${this.apiUrl}/profile`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (profileResponse.ok) {
//         const profileData = await profileResponse.json();
//         isAuthenticated = true;
//         user = profileData.user;
//       }
//     } catch (error) {
//       console.log("Authentication check failed:", error);
//     }

//     // Show different content based on authentication status
//     if (isAuthenticated) {
//       this.popup.innerHTML = `
//         <div class="privyage-widget">
//           <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
//             Age Verification Required
//           </h3>
//           <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px;">
//             Hello ${user.name}! Please verify your age to continue. You must be ${this.requiredAge} or older.
//           </p>
//           <form id="privyage-form">
//             <div style="margin-bottom: 16px;">
//               <label for="privyage-age" style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
//                 Enter your age:
//               </label>
//               <input
//                 type="number"
//                 id="privyage-age"
//                 min="1"
//                 max="120"
//                 required
//                 style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
//               />
//             </div>
//             <div id="privyage-error" style="color: #dc2626; font-size: 12px; margin-bottom: 16px; display: none;"></div>
//             <div style="display: flex; gap: 12px;">
//               <button
//                 type="submit"
//                 id="privyage-verify"
//                 style="flex: 1; background: #2563eb; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;"
//               >
//                 Verify Age
//               </button>
//               <button
//                 type="button"
//                 id="privyage-cancel"
//                 style="flex: 1; background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       `;
//     } else {
//       this.popup.innerHTML = `
//         <div class="privyage-widget">
//           <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1f2937;">
//             Age Verification Required
//           </h3>
//           <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px;">
//             Please log in first to verify your age. You must be ${this.requiredAge} or older.
//           </p>
//           <div style="display: flex; gap: 12px;">
//             <button
//               type="button"
//               id="privyage-cancel"
//               style="flex: 1; background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               id="privyage-login"
//               style="flex: 1; background: #2563eb; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;"
//             >
//               Log In
//             </button>
//           </div>
//         </div>
//       `;
//     }

//     // Add event listeners
//     const form = this.popup.querySelector("#privyage-form");
//     const cancelBtn = this.popup.querySelector("#privyage-cancel");
//     const verifyBtn = this.popup.querySelector("#privyage-verify");
//     const loginBtn = this.popup.querySelector("#privyage-login");
//     const ageInput = this.popup.querySelector("#privyage-age");
//     const errorDiv = this.popup.querySelector("#privyage-error");

//     if (form) {
//       form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         await this.handleVerification(ageInput, verifyBtn, errorDiv);
//       });
//     }

//     cancelBtn.addEventListener("click", () => this.hide());

//     if (loginBtn) {
//       loginBtn.addEventListener("click", async () => {
//         await this.handleLogin();
//       });
//     }

//     // Prevent popup from closing when clicking inside
//     this.popup.addEventListener("click", (e) => e.stopPropagation());

//     document.body.appendChild(this.popup);
//   }

//   async handleVerification(ageInput, verifyBtn, errorDiv) {
//     const age = parseInt(ageInput.value);

//     if (!age || age < 1 || age > 120) {
//       this.showError(errorDiv, "Please enter a valid age between 1 and 120");
//       return;
//     }

//     verifyBtn.disabled = true;
//     verifyBtn.textContent = "Verifying...";
//     this.hideError(errorDiv);

//     try {
//       // First check if user is authenticated
//       const profileResponse = await fetch(`${this.apiUrl}/profile`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!profileResponse.ok) {
//         throw new Error("Please log in first to verify your age");
//       }

//       const profileData = await profileResponse.json();
//       console.log("User authenticated:", profileData.user);

//       // Get Moca verification configuration
//       const configResponse = await fetch(
//         `${this.apiUrl}/verify-age-credential`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Include session cookie for authentication
//           body: JSON.stringify({ requiredAge: this.requiredAge }),
//         }
//       );

//       if (!configResponse.ok) {
//         throw new Error("Failed to get verification configuration");
//       }

//       const { authToken, config } = await configResponse.json();

//       // Use Moca AIRKit for verification (like the hooks do)
//       if (typeof window !== "undefined" && window.AirService) {
//         const airService = new window.AirService({
//           partnerId: this.partnerId || "8438b5e0-b143-495d-ab2f-2a48aead495b",
//         });

//         await airService.init({
//           buildEnv: window.BUILD_ENV.SANDBOX,
//           enableLogging: true,
//           skipRehydration: false,
//         });

//         const verificationParams = {
//           authToken: authToken,
//           programId: config.programId,
//           redirectUrl: config.redirectUrlForIssuer,
//         };

//         console.log("Moca AIRKit verification parameters:", verificationParams);

//         const result = await airService.verifyCredential(verificationParams);
//         console.log("Verification result:", result);

//         const verificationResult = {
//           verified: result.status === "Compliant",
//           status: result.status,
//           payload: result.payload,
//         };

//         if (verificationResult.verified) {
//           this.hide();
//           this.onVerified(true, verificationResult.age || age);
//         } else {
//           throw new Error("Age verification failed");
//         }
//       } else {
//         throw new Error(
//           "Moca AIRKit not available. Please ensure the AIRKit SDK is loaded on the page."
//         );
//       }
//     } catch (error) {
//       this.showError(errorDiv, error.message);
//       this.onError(error);
//     } finally {
//       verifyBtn.disabled = false;
//       verifyBtn.textContent = "Verify Age";
//     }
//   }

//   showError(errorDiv, message) {
//     errorDiv.textContent = message;
//     errorDiv.style.display = "block";
//   }

//   hideError(errorDiv) {
//     errorDiv.style.display = "none";
//   }

//   async handleLogin() {
//     try {
//       // Check if Moca AIRKit is available
//       if (typeof window === "undefined" || !window.AirService) {
//         throw new Error(
//           "Moca AIRKit not available. Please ensure the AIRKit SDK is loaded on the page."
//         );
//       }

//       // Initialize Moca AIRKit service
//       const airService = new window.AirService({
//         partnerId: this.partnerId || "8438b5e0-b143-495d-ab2f-2a48aead495b",
//       });

//       await airService.init({
//         buildEnv: window.BUILD_ENV.SANDBOX,
//         enableLogging: true,
//         skipRehydration: false,
//       });

//       // Perform login
//       const loginResult = await airService.login();

//       if (loginResult.isLoggedIn) {
//         // Get access token
//         const tokenResult = await airService.getAccessToken();

//         // Send login data to backend
//         const response = await fetch(`${this.apiUrl}/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             user: {
//               did: loginResult.id,
//               name: "User", // You can get this from getUserInfo if needed
//             },
//             accessToken: tokenResult.token,
//           }),
//         });

//         if (response.ok) {
//           console.log("Login successful");
//           this.hide();
//           // Refresh the page or trigger a callback to update UI
//           if (this.onLoginSuccess) {
//             this.onLoginSuccess();
//           } else {
//             // Reload page to show updated state
//             window.location.reload();
//           }
//         } else {
//           throw new Error("Failed to save login session");
//         }
//       } else {
//         throw new Error("Login was cancelled or failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert(`Login failed: ${error.message}`);
//     }
//   }
// }

// // Make it available globally
// window.PrivyAgeWidget = PrivyAgeWidget;

// // Auto-initialize widget for external integration
// document.addEventListener("DOMContentLoaded", () => {
//   // Look for verify button with id="verify"
//   const verifyButton = document.getElementById("verify");
//   if (verifyButton) {
//     const widget = new PrivyAgeWidget({
//       apiUrl: "http://localhost:3001/api/auth",
//       requiredAge: 18,
//       onVerified: (verified, age) => {
//         // Send message to parent window (for iframe/popup scenarios)
//         if (window.parent !== window) {
//           window.parent.postMessage(
//             {
//               type: "PRIVYAGE_VERIFICATION_RESULT",
//               verified: verified,
//               age: age,
//               requiredAge: 18,
//             },
//             "*"
//           );
//         }

//         // Also dispatch custom event for same-window scenarios
//         window.dispatchEvent(
//           new CustomEvent("privyage-verified", {
//             detail: { verified, age, requiredAge: 18 },
//           })
//         );

//         // Show content if verified
//         if (verified) {
//           const content = document.getElementById("content");
//           if (content) {
//             content.hidden = false;
//           }
//         }
//       },
//       onError: (error) => {
//         console.error("PrivyAge verification error:", error);
//         window.dispatchEvent(
//           new CustomEvent("privyage-error", {
//             detail: { error },
//           })
//         );
//       },
//     });

//     // Attach click handler to verify button
//     verifyButton.addEventListener("click", () => {
//       widget.show();
//     });
//   }
// });

// // Listen for messages from popup/iframe
// window.addEventListener("message", (e) => {
//   if (
//     e.origin === window.location.origin &&
//     e.data.type === "PRIVYAGE_VERIFICATION_RESULT"
//   ) {
//     if (e.data.verified) {
//       const content = document.getElementById("content");
//       if (content) {
//         content.hidden = false;
//       }
//     }
//   }
// });
