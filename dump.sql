--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "commentText" text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    followed integer NOT NULL,
    following integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name character varying(55) NOT NULL,
    "timesUsed" integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.metadata (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    description character varying(255) NOT NULL,
    url text NOT NULL,
    image text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.metadata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.metadata_id_seq OWNED BY public.metadata.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    url text NOT NULL,
    "userId" integer NOT NULL,
    description character varying(255),
    "metadataId" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: shares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shares (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "userName" text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shares_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shares_id_seq OWNED BY public.shares.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password text NOT NULL,
    "imageUrl" text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: metadata id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.metadata ALTER COLUMN id SET DEFAULT nextval('public.metadata_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: shares id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares ALTER COLUMN id SET DEFAULT nextval('public.shares_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 2, 2, 'I''m the author', '2023-03-23 08:45:39.486122');


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.followers VALUES (2, 3, 2, '2023-03-22 18:25:44.563132');
INSERT INTO public.followers VALUES (4, 2, 3, '2023-03-23 08:47:43.856457');
INSERT INTO public.followers VALUES (5, 1, 3, '2023-03-23 08:49:17.639386');
INSERT INTO public.followers VALUES (6, 3, 4, '2023-03-23 08:51:28.443189');
INSERT INTO public.followers VALUES (11, 1, 5, '2023-03-23 16:54:15.549618');
INSERT INTO public.followers VALUES (12, 3, 5, '2023-03-23 16:54:48.784829');
INSERT INTO public.followers VALUES (13, 2, 5, '2023-03-23 17:16:09.912978');
INSERT INTO public.followers VALUES (14, 2, 1, '2023-03-23 17:17:35.589255');
INSERT INTO public.followers VALUES (15, 1, 2, '2023-03-27 08:02:15.231894');


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, '#tests', 1, '2023-03-22 20:23:11.943069');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (1, 1, 2, '2023-03-22 18:38:29.264877');


--
-- Data for Name: metadata; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.metadata VALUES (1, 'Afinal, como Gai sobreviveu ao abrir os Oito Portões em Naruto Shippuden?', 'Se você achava que teria dificuldades em encontrar um momento tão emocionante quanto a luta de Rock Lee e Gaara, com certeza se surpreendeu com o', 'https://criticalhits.com.br/anime/afinal-como-gai-sobreviveu-ao-abrir-os-oito-portoes-em-naruto-shippuden/', 'https://criticalhits.com.br/wp-content/uploads/2019/09/guy-cadeira-de-rodas.jpg', '2023-03-22 18:24:59.54874');
INSERT INTO public.metadata VALUES (2, 'Naruto | Por que o brasileiro ama tanto o ninja de Konoha?', 'Por que o brasileiro ama tanto o ninja Naruto', 'https://www.omelete.com.br/naruto/naruto-especial-bento', 'https://cdn.ome.lt/_KCIIW0hHAX2AJ5vSLtP_E1VgOM=/1200x630/smart/extras/conteudos/naruto_sDnBH1k.png', '2023-03-22 20:23:11.927707');
INSERT INTO public.metadata VALUES (3, 'Naruto: As sete cenas mais épicas de Itachi Uchiha', 'Itachi Uchiha é tranquilamente um dos melhores personagens de Naruto; escolhemos as sete cenas mais épicas do personagem.', 'https://br.ign.com/naruto-shippuden/84725/feature/naruto-as-sete-cenas-mais-epicas-de-itachi-uchiha', 'https://sm.ign.com/t/ign_br/screenshot/3/3o-itachi-/3o-itachi-uchiha_k81j.1200.jpg', '2023-03-23 11:53:23.951275');
INSERT INTO public.metadata VALUES (4, 'Kakashi: 8 coisas que você não sabia sobre o personagem de Naruto', 'Professor do clássico Time 7, Hatake Kakashi não demorou para conquistar inúmeros fãs de Naruto; veja 8 curiosidades sobre o personagem!', 'https://www.tecmundo.com.br/minha-serie/228934-kakashi-8-coisas-voce-nao-sabia-personagem-naruto.htm', 'https://tm.ibxk.com.br/2021/11/18/18083751420027.jpg', '2023-03-23 17:43:44.87065');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'I''m Naruto 1', 2, '2023-03-23 18:27:39.907952');
INSERT INTO public.posts VALUES (2, 'https://br.ign.com/naruto-shippuden/84725/feature/naruto-as-sete-cenas-mais-epicas-de-itachi-uchiha', 2, 'Hey', 3, '2023-03-23 18:31:59.735278');
INSERT INTO public.posts VALUES (3, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 07:58:58.469975');
INSERT INTO public.posts VALUES (4, 'https://br.ign.com/naruto-shippuden/84725/feature/naruto-as-sete-cenas-mais-epicas-de-itachi-uchiha', 1, 'This is my post!', 3, '2023-03-27 08:00:17.675661');
INSERT INTO public.posts VALUES (5, 'https://www.tecmundo.com.br/minha-serie/228934-kakashi-8-coisas-voce-nao-sabia-personagem-naruto.htm', 1, 'This is my post!', 4, '2023-03-27 08:00:22.65082');
INSERT INTO public.posts VALUES (6, 'https://criticalhits.com.br/anime/afinal-como-gai-sobreviveu-ao-abrir-os-oito-portoes-em-naruto-shippuden/', 1, 'This is my post!', 1, '2023-03-27 08:00:28.853549');
INSERT INTO public.posts VALUES (7, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:00:55.746948');
INSERT INTO public.posts VALUES (8, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:02.280192');
INSERT INTO public.posts VALUES (9, 'https://br.ign.com/naruto-shippuden/84725/feature/naruto-as-sete-cenas-mais-epicas-de-itachi-uchiha', 1, 'This is my post!', 3, '2023-03-27 08:01:06.435028');
INSERT INTO public.posts VALUES (10, 'https://www.tecmundo.com.br/minha-serie/228934-kakashi-8-coisas-voce-nao-sabia-personagem-naruto.htm', 1, 'This is my post!', 4, '2023-03-27 08:01:11.817203');
INSERT INTO public.posts VALUES (11, 'https://criticalhits.com.br/anime/afinal-como-gai-sobreviveu-ao-abrir-os-oito-portoes-em-naruto-shippuden/', 1, 'This is my post!', 1, '2023-03-27 08:01:15.960269');
INSERT INTO public.posts VALUES (12, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:24.730891');
INSERT INTO public.posts VALUES (13, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:34.10495');
INSERT INTO public.posts VALUES (14, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:39.094649');
INSERT INTO public.posts VALUES (15, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:43.266023');
INSERT INTO public.posts VALUES (16, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:47.577811');
INSERT INTO public.posts VALUES (17, 'https://www.omelete.com.br/naruto/naruto-especial-bento', 1, 'This is my post!', 2, '2023-03-27 08:01:54.408171');


--
-- Data for Name: shares; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'naruto1', 'naruto1@gmail.com', '$2b$10$o8suNIDILdZifBWwo.D2pephhp/YJqAwE4fO.kOIk2up7fNB2P2Ju', 'https://i.uai.com.br/FE59Sj843sbi5f85yreUcwMtXRs=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg', '2023-03-22 18:23:03.236847');
INSERT INTO public.users VALUES (2, 'naruto2', 'naruto2@gmail.com', '$2b$10$8uYZ3ZDg79Q/8m63Df/gv.Uyon6SjjnURI5hTC1o3n7dPn0jp5wCy', 'https://i.uai.com.br/FE59Sj843sbi5f85yreUcwMtXRs=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg', '2023-03-22 18:23:34.345485');
INSERT INTO public.users VALUES (3, 'naruto3', 'naruto3@gmail.com', '$2b$10$gQxCZr9Ay4g3v0dk3ZdAb.cm1Ovw9e25baoaiGMAEsUeEt.nm82Py', 'https://i.uai.com.br/FE59Sj843sbi5f85yreUcwMtXRs=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg', '2023-03-22 18:23:46.908866');
INSERT INTO public.users VALUES (4, 'naruto4', 'naruto4@gmail.com', '$2b$10$YMsiqe7EXAsemPb9VINZTO.wtq2zk3oLV6TrntOM279VYzQemo4Cu', 'https://i.uai.com.br/FE59Sj843sbi5f85yreUcwMtXRs=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg', '2023-03-22 18:24:03.516886');
INSERT INTO public.users VALUES (5, 'naruto5', 'naruto5@gmail.com', '$2b$10$CU1VvErEnpwBH2vx4F/cTuXsFP7KM9bV6DbeLp5sICaFBMsT3CkXa', 'https://i.uai.com.br/FE59Sj843sbi5f85yreUcwMtXRs=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg', '2023-03-22 18:24:15.982395');
INSERT INTO public.users VALUES (6, 'naruto6', 'naruto6@gmail.com', '$2b$10$ca82rVdfvJvI8U/fXM71nOXeq7ZpAVuCrEKJENc.9YpM5lJ.cZfjG', 'https://i.uai.com.br/FE59Sj843sbi5f85yreUcwMtXRs=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2022/12/11/310968/naruto-e-um-dos-animes-mais-populares-do-mundo_1_45898.jpg', '2023-03-22 18:24:35.536548');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 15, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 1, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, true);


--
-- Name: metadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.metadata_id_seq', 4, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 17, true);


--
-- Name: shares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shares_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: metadata metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: shares shares_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: posts posts_metadataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES public.metadata(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shares shares_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT "shares_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: shares shares_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT "shares_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

