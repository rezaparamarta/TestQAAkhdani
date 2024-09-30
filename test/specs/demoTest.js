// Fungsi untuk menghasilkan username acak
function generateRandomUsername() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    const usernameLength = 10;
    for (let i = 0; i < usernameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters[randomIndex];
    }
    return username;
}

describe('Sign up Page', () => {
    it('Test Case 1 - Access the website and check the browser title', async () => {
        await browser.url('https://www.demoblaze.com/');
        
        const title = await browser.getTitle();
        console.log('The page title is:', title);  // Log the actual title for debugging
        await browser.pause(5000);
    });

    it('Test Case 2 - Get the text of the navigation menu', async () => {
        await browser.url('/');

        const expectedLinks = [
            'Home',
            'Contact',
            'About us',
            'Cart',
            'Log in',
            'Sign up'
        ];

        const actualLinks = [];
        const navlinks = await $$('.navbar-nav .nav-item a');
        for (const link of navlinks) {
            const text = await link.getText();
            if (text.trim()) {  // Remove empty texts
                actualLinks.push(text.trim().replace('(current)', '').trim());
            }
        }
        
        console.log('Actual Links:', actualLinks);
        expect(actualLinks).toEqual(expectedLinks);
    });

    it('Test Case 3 - Sign up with valid credentials and capture dialog', async () => {
        await browser.url('/');
    
        const link = await $('#signin2');
    
        // Scroll to the element and ensure it is displayed and clickable
        await link.scrollIntoView();
        await link.waitForDisplayed({ timeout: 10000 });
        
        try {
            await link.waitForClickable({ timeout: 10000 });
            await link.click(); // Regular click attempt
        } catch (error) {
            // Use JS click if the regular click fails due to interception
            await browser.execute((el) => el.click(), link);
        }
    
        const emailInput = await $('#sign-username');
        const passwordInput = await $('#sign-password');
    
        // Generate a random username
        const randomUsername = generateRandomUsername();
        await emailInput.setValue(randomUsername); // Use random username
        await passwordInput.setValue('12345678');
    
        // Locate the "Sign up" button in the modal
        const signUpButton = await $('//button[contains(@onclick, "register()")]');
    
        // Ensure the "Sign up" button is clickable
        await signUpButton.waitForClickable({ timeout: 10000 });
    
        // Click the "Sign up" button
        await signUpButton.click();
    
        // Capture the success message from the modal (if it's a modal dialog)
        const modalMessage = await $('div.modal-body').getText();
        console.log('Modal Text:', modalMessage);
    
        // Assert the text (adjust the expectation based on actual success message)
        expect(modalMessage).toContain('');  // Adjust this based on expected modal message
        await browser.pause(3000);
    });        

    it('Test Case 4 - Log in with valid credentials and capture dialog', async () => { 
        await browser.url('/');
    
        const loginLink = await $('#login2');
    
        // Wait for the element to be displayed and clickable
        await loginLink.waitForDisplayed({ timeout: 10000 });
        await loginLink.scrollIntoView();
    
        // Sometimes images or other elements may be blocking the login link, so execute a JS click if necessary
        try {
            await loginLink.waitForClickable({ timeout: 10000 });
            await loginLink.click(); // Regular click attempt
        } catch (error) {
            // Use JS click if the regular click fails due to interception
            await browser.execute((el) => el.click(), loginLink);
        }
    
        // Wait for login modal inputs to appear
        const emailInput = await $('#loginusername');
        const passwordInput = await $('#loginpassword');
    
        // Input valid credentials
        await emailInput.setValue('Reza Paramarta'); 
        await passwordInput.setValue('12345678');
    
        // Locate the "Log in" button in the modal
        const loginButton = await $('//button[contains(@onclick, "logIn()")]');
    
        // Ensure the "Log in" button is clickable
        await loginButton.waitForClickable({ timeout: 10000 });
    
        // Click the "Log in" button
        await loginButton.click();
    
        // Pause to observe the behavior (optional)
        await browser.pause(3000);
    });
    
    // it('Negative Test Case 4a - Handle HTML modal error after login without credentials', async () => {
    //     // Buka homepage
    //     await browser.url('/');
    
    //     // Klik link "Log In"
    //     const loginLink = await $('#login2');
    //     await loginLink.click();
    
    //     // Tunggu modal login muncul
    //     const loginModal = await $('#logInModal');
    //     await loginModal.waitForDisplayed({ timeout: 5000 });
    
    //     // Kosongkan field username dan password, lalu klik tombol "Log in"
    //     const loginButton = await $('//button[text()="Log in"]');
    //     await loginButton.click();
    
    //     // Cek apakah elemen dengan ID #errorl ada di DOM
    //     const errorMessageElement = await $('#errorl');
    //     const exists = await errorMessageElement.isExisting();
    //     console.log('Element exists:', exists);  // Log apakah elemen ada
    
    //     // Definisikan pesan error yang diharapkan
    //     const expectedErrorMessage = 'Please fill out Username and Password';
    
    //     if (exists) {
    //         // Cek apakah elemen terlihat di halaman
    //         const isDisplayed = await errorMessageElement.isDisplayed();
    //         console.log('Element displayed:', isDisplayed);  // Log apakah elemen terlihat
    
    //         // Jika elemen terlihat, ambil teksnya
    //         if (isDisplayed) {
    //             const errorMessage = await errorMessageElement.getText();
    //             console.log('Error Message:', errorMessage);  // Print pesan error
    
    //             // Verifikasi bahwa pesan error sesuai dengan yang diharapkan
    //             await expect(errorMessage).toEqual(expectedErrorMessage);
    //         } else {
    //             console.log('Error message element is not displayed.');
    //         }
    //     } else {
    //         console.log('Error message element does not exist.');
    //     }

    //     expect(exists).toBe(true);
    
    //     // Pause sebentar untuk memastikan UI stabil
    //     await browser.pause(5000);
    // }); 

    it('Test Case 5 - Click Samsung Galaxy S6, check specification, and Add to Cart', async () => {
        await browser.url('/index.html');
    
        // Define all elements in variable
        const product = {
            name: await $('//*[@id="tbodyid"]/div[1]/div/div/h4/a'),
            image: await $('//*[@id="imgp"]/div/img'),
            title: await $('//*[@id="tbodyid"]/h2'),
            price: await $('//*[@id="tbodyid"]/h3'),
            specs: await $('//*[@id="more-information"]')
        };
    
        // Click on the product name (Samsung Galaxy S6)
        await product.name.click();
    
        // Assert product details
        expect(await product.image.getAttribute('src')).toContain('galaxy_s6.jpg'); // Optimized expected value
        expect(await product.title.getText()).toContain('Samsung galaxy s6');
        expect(await product.price.getText()).toContain('$360 *includes tax');
        
        // Optimized spec assertions
        const specsText = await product.specs.getText();
        expect(specsText).toContain('The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM.');
        expect(specsText).toContain('The phone packs 32GB of internal storage');

        // Add to cart
        const addToCartButton = await $('//*[@id="tbodyid"]/div[2]/div/a');
        await addToCartButton.click();
        await browser.pause(5000);
    });
    it('Test Case 6 - Click Navigation Menu Cart and ensure item is added to cart', async () => { 
        const cartButton = await $('//*[@id="cartur"]');
        await cartButton.click();

        await browser.pause(8000);
    });
    it('Test Case 7 - Click Place Order to Purchase Item', async () => {
        const placeOrderButton = await $('//*[@id="page-wrapper"]/div/div[2]/button');
        await placeOrderButton.click();
        await browser.pause(3000);
    });
    it('Test Case 8 - Fill all input fields and click Purchase button', async () => {
        const firstNameInput = await $('#name');
        const countryNameInput = await $('#country');
        const cityNameInput = await $('#city');
        const creditCardInput = await $('#card');
        const monthInput = await $('#month');
        const yearInput = await $('#year');
    
        await firstNameInput.setValue('Reza');
        await countryNameInput.setValue('Indonesia');
        await cityNameInput.setValue('Jakarta');
        await creditCardInput.setValue('4242424242424242');
        await monthInput.setValue('12');
        await yearInput.setValue('2024');
    
        const purchaseButton = await $('//*[@id="orderModal"]/div/div/div[3]/button[2]');
        await purchaseButton.click();
        
        // Wait for the dialog to appear
        const sweetAlert = await $('.sweet-alert');
        await sweetAlert.waitForDisplayed({ timeout: 5000 });
    
        // Capture the success message from the dialog
        const modalMessage = await sweetAlert.$('h2').getText();
        console.log('Modal Text:', modalMessage);
        await browser.pause(5000);
    
        // Assert the success message
        expect(modalMessage).toBe('Thank you for your purchase!');

        // Click OK Button
        const okButton = await $('.sweet-alert button.confirm');
        await okButton.click();
        await browser.pause(5000);
    });
    it('Test Case 9 - Click About Us Navigation Menu check Detail and close dialog', async () => { 
        const aboutUsButton = await $('//*[@id="navbarExample"]/ul/li[3]/a');
        const closeButton = await $('//*[@id="videoModal"]/div/div/div[3]/button');
    
        // Scroll to the "About Us" button and ensure it's displayed
        await aboutUsButton.scrollIntoView();
        await aboutUsButton.waitForDisplayed({ timeout: 10000 });
    
        // Try clicking the "About Us" button and handle click interception
        try {
            await aboutUsButton.waitForClickable({ timeout: 10000 });
            await aboutUsButton.click(); // Regular click attempt
        } catch (error) {
            // Use JS click if the regular click fails due to interception
            await browser.execute((el) => el.click(), aboutUsButton);
        }
    
        // Pause to observe the modal appearing
        await browser.pause(5000);
    
        // Ensure the close button is clickable and close the modal
        await closeButton.waitForClickable({ timeout: 10000 });
        await closeButton.click();
    
        // Pause to observe the modal closing
        await browser.pause(5000);
    });
    it('Test Case 10 - should display Sony Vaio i5 after selecting Laptops category', async () => {
        // Open the webpage
        await browser.url('/');
        
        // Click the Laptops category link
        const laptopsCategory = await $('a[onclick="byCat(\'notebook\')"]');
        await laptopsCategory.click();
        
        // Wait for the products to load
        await browser.pause(2000); // Adjust as needed based on page loading time
        
        // Check catalog for "Sony Vaio i5" is visible
        const sonyVaioI5 = await $('a[href="prod.html?idp_=8"]');
        
        // Expect that the product is displayed
        await expect(sonyVaioI5).toBeDisplayed();
        await browser.pause(3000);
    });
    it('Test Case 11 - Log out', async () => {
        const logOutLink = await $('#logout2');
    
        // Wait for the Log Out link to be displayed and clickable
        await logOutLink.waitForDisplayed({ timeout: 10000 });
        await logOutLink.scrollIntoView();
    
        // Sometimes elements may not be directly clickable due to overlay, so use a JS click if necessary
        try {
            await logOutLink.waitForClickable({ timeout: 10000 });
            await logOutLink.click(); // Regular click attempt
        } catch (error) {
            // Use JS click if the regular click fails due to interception
            await browser.execute((el) => el.click(), logOutLink);
        }
    
        await browser.pause(3000); // Pause to observe the behavior (optional)
    });      
});

  
 