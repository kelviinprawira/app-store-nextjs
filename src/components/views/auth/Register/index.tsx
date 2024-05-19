import Link from 'next/link';
import styles from './Register.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const RegisterView = () => {
    
    const {push} = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        setError('')
        const form = event.target as HTMLFormElement
        const data = {
            fullname: form.fullname.value,
            email: form.email.value,
            phone: form.phone.value,
            password: form.password.value,
        };

        const result = await fetch("/api/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if(result.status === 200){
            form.reset();
            setIsLoading(false)
            push("/auth/login");
        } else{
            setIsLoading(false);
            setError('Email already registered')
        }

    }

  return (
    <>
        <div className={styles.register}>
            <h1 className={styles.register__title}>Regiser</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSumbit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">Fullname</label>
                        <input type="text"
                        id='fullname' 
                        name='fullname'
                        placeholder='Masukkan nama anda'
                        className={styles.register__form__item__input}/>
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder="Masukkan email anda"
                        className={styles.register__form__item__input}/>
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">Phone</label>
                        <input type="text"
                        id="phone"
                        name="phone"
                        placeholder="Masukkan nomer anda"
                        className={styles.register__form__item__input}/>
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="Masukkan password anda"
                        className={styles.register__form__item__input}/>
                    </div>
                    <button type="submit" className={styles.register__form__button}>
                        {isLoading ? 'loading....' : 'Register'}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>Have an account? Sign in <Link href="/auth/login">here</Link></p>
        </div>
    </>
  )
}

export default RegisterView