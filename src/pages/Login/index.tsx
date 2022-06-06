import { useFormik } from 'formik';
import { InputHTMLAttributes } from 'react';
import * as yup from 'yup';
import axios from 'axios';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  accessToken: string;
}

type LoginProps = {
  signInUser: (user: User) => void;
}

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full bg-transparent p-4 border rounded border-onix text-lg outline-none focus:border-platinum"
    />
  );
}

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha')
})



export function Login({ signInUser }: LoginProps) {

  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get<User>('http://localhost:3030/login', {
        auth: {
          username: values.email,
          password: values.password,
        }
      });

      signInUser(res.data);
    },
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: '',
      password: ''
    }
  });

  return (
    <div className='h-full flex justify-center'>
      <div className='bg-birdBlue lg:flex-1'>
      </div>
      <div className=" flex-1 flex items-center justify-center p-12 space-y-6">
        <div className='max-w-md flex-1 space-y-6 flex flex-col'>
          <h1 className="text-3xl text-center">Acesse sua conta</h1>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className='space-y-2'>
              <Input
                name="email"
                type="text"
                placeholder="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {
                (formik.touched.email && formik.errors.email) && (
                  <div className='text-red-500 text-sm'>{formik.errors.email}</div>)
              }
            </div>
            <div className='space-y-2'>
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {
                (formik.touched.password && formik.errors.password) && (
                  <div className='text-red-500 text-sm'>{formik.errors.password}</div>)
              }
            </div>
            <button
              type="submit"
              className="w-full bg-birdBlue py-3 rounded-full disabled:opacity-50 text-lg"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? 'Enviando...' : 'Entrar'}
            </button>
          </form>

          <span className="text-sm text-silver text-center">Não tem conta? <a href='/signup' className="text-birdBlue">Inscreva-se</a></span>
        </div>
      </div>
    </div>
  );
}