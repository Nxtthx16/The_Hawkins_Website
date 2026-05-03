document.addEventListener('DOMContentLoaded', () => {
    // กำหนดตัวแปรที่ผูกกับ Element ในฟอร์มของเรา
    const form = document.getElementById('dispatch-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const successMsg = document.getElementById('success-msg');
    const errorMsg = document.getElementById('error-msg');

    // ถ้าไม่มีฟอร์มในหน้านั้น ให้หยุดทำงาน (กัน Error ในหน้าที่ไม่มีฟอร์ม)
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        // หยุดการทำงาน Default ของฟอร์ม (กันไม่ให้หน้าเว็บ Refresh หรือเด้งไปหน้า Formspree)
        e.preventDefault();
        
        // อัพเดท UI เพื่อบอกว่ากำลังโหลด (ซ่อนคำว่า Initiate และโชว์ Spinner)
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
        successMsg.classList.add('hidden');
        errorMsg.classList.add('hidden');
        
        // เรียกใช้ reCAPTCHA V3
        grecaptcha.ready(() => {
            // ใช้ Site Key ของคุณเพื่อขอกุญแจ Token (action: 'submit' คือชื่อ action ในระบบ)
            grecaptcha.execute('6LdmO84sAAAAAKOjP5YNgdbL4mjITAIxWyU6Ruh6', { action: 'submit' })
            .then(async (token) => {
                // เอา Token ที่ได้ไปยัดใส่ใน Hidden Input ที่เตรียมไว้
                document.getElementById('recaptcha-response').value = token;
                
                // เตรียมแพ็คข้อมูลทั้งหมดในฟอร์ม
                const formData = new FormData(form);

                try {
                    // ส่งข้อมูลแบบเบื้องหลัง (Fetch API) ไปที่ URL ของ Formspree
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json' // แจ้ง Formspree ว่าขอรับผลลัพธ์เป็นแบบ JSON ไม่เอาหน้าเว็บ
                        }
                    });

                    if (response.ok) {
                        // ถ้าส่งสำเร็จ โชว์กล่องข้อความสีเขียว และล้างข้อมูลในฟอร์ม
                        successMsg.classList.remove('hidden');
                        form.reset();
                    } else {
                        // ถ้าส่งไม่สำเร็จ โชว์กล่องข้อความสีแดง
                        errorMsg.classList.remove('hidden');
                    }
                } catch (error) {
                    // กรณีเน็ตหลุดหรือมีปัญหาตอนเชื่อมต่อ
                    errorMsg.classList.remove('hidden');
                } finally {
                    // ไม่ว่าจะสำเร็จหรือล้มเหลว คืนค่าปุ่มให้กลับมาพร้อมกดใหม่
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                    submitBtn.disabled = false;
                }
            });
        });
    });
});