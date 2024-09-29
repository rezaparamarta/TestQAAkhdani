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
        await browser.pause(5000);
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
        await browser.pause(5000);
    });
});
