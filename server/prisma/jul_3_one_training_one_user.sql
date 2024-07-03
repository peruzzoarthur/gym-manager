--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

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

--
-- Data for Name: ExerciseReference; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('c64ef60b-4cf7-400d-9cfc-834bac9b233b', 'Puxada articulada', '{BACK}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('651e0f4c-7428-4fea-ae03-72e448cbfa97', 'Puxada neutra', '{BACK}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('0b0f38e4-6b9d-452e-ad68-fd605e8a3613', 'Puxada supinada', '{BACK}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('81c104de-71b1-404a-8535-9d606eba4dcc', 'Remada cavalinho', '{BACK}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('d3043b26-44c0-4eab-9715-3cc47997b061', 'Serrote', '{BACK}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('0bfc07e8-7a9d-4b24-9020-8b48f2ac7adb', 'Supino reto', '{CHEST}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('793dbb81-e5f8-4ca7-b952-45d52dd988c4', 'Supino inclinado', '{CHEST}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('9601cc0e-aa3d-4b91-bcc2-15b70e159d4d', 'Crucifixo', '{CHEST}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('bd6097e9-2ed1-412a-b839-17e760591bb4', 'Triceps pulley', '{TRICEPS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('89d46d06-1a9e-404d-a978-b280174dc1fa', 'Triceps com corda', '{TRICEPS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('fe6be2e4-9388-4665-8499-a045af359614', 'Rosca alternada', '{BICEPS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('f39f62d2-380d-402b-be76-b7be991a3311', 'Martelo', '{BICEPS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('4526302a-acf8-4120-a377-857c7d53f4c9', 'Rosca scott', '{BICEPS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('9da6306c-d291-4e56-a9cb-c41cc9026d9d', 'Agachamento livre', '{LEGS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('83c3ffd4-923e-4667-946c-033b47aa1bd2', 'Agachamento goblet', '{LEGS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('b4fdb432-2503-40cd-93f4-4da987bfcfa0', 'Levantamento terra', '{LEGS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('22bf1d9c-9828-45d4-a02c-a614c28d8851', 'Extensor', '{LEGS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('c383c4bc-ca4c-4c4c-8d1c-2d1dfac5101a', 'Flexor', '{LEGS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('fe7f271f-1f44-4358-82ac-4854755297e7', 'Panturrilha sentado', '{CALVES}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('a858695a-913f-4cca-be53-21ac9eefa01c', 'Elevação frontal', '{SHOULDERS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('249d5591-49cd-40af-bb26-9eed7cb2bff8', 'Elevação lateral', '{SHOULDERS}');
INSERT INTO public."ExerciseReference" (id, name, groups) VALUES ('16f4429d-6c9b-4785-822c-c734f7a11e16', 'Desenvolvimento', '{SHOULDERS}');


--
-- Data for Name: Exercise; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Training; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Training" (id, tempo, "daysInWeek", done, "createdAt", "updatedAt", rounds, reps, sets, rest) VALUES ('54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'ONE2THREE', 5, false, '2024-07-03 15:00:54.298', '2024-07-03 15:00:54.298', 4, 12, 3, 60);


--
-- Data for Name: TrainingGroup; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('ec184d1e-e8c7-4079-af70-aea3f593125e', 'A', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'CIS', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('5af01d62-7d45-4429-a470-a0807fdb4b90', 'B', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'CIS', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('0fefe85e-fd8e-455e-b01a-9d343b3aa9c7', 'C', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'CIS', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('84e8936c-2852-4f14-9d87-894e0308b334', 'D', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'CIS', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('e2ec9d37-382c-43a2-91f9-1a9b38256c10', 'E', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'CIS', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('974b3644-13e5-4d24-b776-9688215ad836', 'E', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'ONE', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('935497b7-a5cd-43af-a9be-622398af2f9f', 'D', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'ONE', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('774f9d58-5025-40c6-8edc-2eae86b3d5ba', 'C', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'ONE', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('7401fed0-5a8d-46ba-ae5b-44f83a202b0d', 'B', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'ONE', 1);
INSERT INTO public."TrainingGroup" (id, key, done, groups, "trainingId", phase, number) VALUES ('cba64e07-c2b7-480d-b0fc-71380f9a457f', 'A', false, NULL, '54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'ONE', 1);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, "firstName", "lastName", email, password, dob, "createdAt", "updatedAt", role, "hashedRt", "profileImage", "activeTrainingId") VALUES ('d2994ffa-e640-4581-b101-1ab01ad6f1d0', 'Arthur', 'Peruzzo', 'ozzu@proton.me', '$argon2id$v=19$m=65536,t=3,p=4$j8OuovR4RH+eUaADWs8xNQ$X18W6swqQ9HBi3d7gwhE9Q2NKzRYZOFLgolvytvZ6es', '1991-12-21 02:00:00', '2024-07-03 14:57:45.867', '2024-07-03 14:57:51.77', 'ADMIN', '$argon2id$v=19$m=65536,t=3,p=4$VAKKkVIfmHp7nDAJTI1SbQ$4AM5VxEp8c9RG/IMOVHDhUQEVYoJbyfO5saqjJY7EEU', NULL, NULL);


--
-- Data for Name: _ExerciseToTrainingGroup; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: _TrainingToUser; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."_TrainingToUser" ("A", "B") VALUES ('54981ff5-f1ce-49d7-ba3f-3b68db5976cb', 'd2994ffa-e640-4581-b101-1ab01ad6f1d0');


--
-- PostgreSQL database dump complete
--

