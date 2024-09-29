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
                actualLinks.push(text.trim().replace('(current)', '').trim());  // Remove '(current)' if exists
            }
        }
        
        console.log('Actual Links:', actualLinks);
        expect(actualLinks).toEqual(expectedLinks);  // Use WebDriverIO syntax for assertion
    });

    it('Test Case 3 - Sign up with valid credentials and capture dialog', async () => {
        await browser.url('/');
    
        const link = await $('#signin2');
        await link.click();
    
        const emailInput = await $('#sign-username');
        const passwordInput = await $('#sign-password');

        // Menghasilkan username acak
        const randomUsername = generateRandomUsername();
        await emailInput.setValue(randomUsername); // Menggunakan username acak
        await passwordInput.setValue('12345678');
    
        const submitButton = await $('//*[@id="signInModal"]/div/div/div[3]/button[2]');
        await submitButton.click();
    
        // Capture the success message from the modal (if it's a modal dialog)
        const modalMessage = await $('div.modal-body').getText();
        console.log('Modal Text:', modalMessage);
    
        // Assert the text
        expect(modalMessage).toContain('');  // Use 'toEqual' instead of 'toDeepEqual'
        await browser.pause(3000);
    });

    it('Test Case 4 - Log in with valid credentials and capture dialog', async () => { 
        await browser.url('/');
        const loginLink = await $('#login2');
        await loginLink.click();
         
        const emailInput = await $('#loginusername');
        const passwordInput = await $('#loginpassword');
        await emailInput.setValue('Reza Paramarta'); // Use the same random username if needed
        await passwordInput.setValue('12345678');
    
        const loginbutton = await $('//*[@id="logInModal"]/div/div/div[3]/button[2]');
        await loginbutton.click();
        await browser.pause(3000);
    });

    it('Test Case 5 - Click Samsung Galaxy S6, check specification, and Add to Cart', async () => {
        await browser.url('/index.html');
    
        // Define all elements at once
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
    it('Test Case 9 - Click About Us Navigation Menu chekc Detail and close dialog', async () => { 
        const aboutUsButton = await $('//*[@id="navbarExample"]/ul/li[3]/a');
        const closeButton = await $('//*[@id="videoModal"]/div/div/div[3]/button');
        await aboutUsButton.click();
        await browser.pause(5000);
        await closeButton.click();
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
        
        // Check that the catalog for "Sony Vaio i5" is visible
        const sonyVaioI5 = await $('a[href="prod.html?idp_=8"]');
        
        // Expect that the product is displayed
        await expect(sonyVaioI5).toBeDisplayed();
        await browser.pause(3000);
    });  
});

  
 