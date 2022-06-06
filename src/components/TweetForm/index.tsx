import axios from 'axios';
import { useFormik } from 'formik';
import { User } from "../../App";

type TweetFormProps = {
  avatar: string;
  loggedInUser: User;
  onSuccess: () => Promise<void>;
}

const MAX_TWEET_CHAR = 140;

export function TweetForm({ avatar, loggedInUser, onSuccess }: TweetFormProps) {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      const token = loggedInUser.accessToken;
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers: {
          'authorization': `Bearer ${token}`
        },
        data: {
          text: values.text
        }
      });

      form.setFieldValue('text', '');
      onSuccess();
    },
    initialValues: {
      text: '',
    }
  });


  return (
    <div className="border-b border-silver p-4 space-y-6">
      <header className="flex space-x-5">
        <img src={avatar} alt="" className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </header>

      <form className="pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          value={formik.values.text}
          className="bg-transparent outline-none disabled:opacity-40"
          placeholder="O que está acontecendo?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span>
            /
            <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}