// import React, { useState } from 'react'
// import { format } from 'date-fns'
// import { SubmitHandler } from 'react-hook-form'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '@/components/ui/button'
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from '../ui/select'
// import { Badge } from '../ui/badge'
// import { Category, EventType, Place } from '@/types/padel.types'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { cn } from '@/lib/utils'
// import { CalendarIcon } from 'lucide-react'
// import { Calendar } from '../ui/calendar'
// import { timesForMatches } from '../../util/times'
// import { CourtsByPlaceCheckbox } from './courtsByPlaceCheckBox'
// import { useGetPlaceWithCourts } from '@/hooks/useGetPlaceWithCourts'
// import { Card, CardFooter, CardHeader } from '../ui/card'
// import { Cross2Icon } from '@radix-ui/react-icons'

// type EventFormProps = {
//     onSubmit: SubmitHandler<formObject>
//     defaultValues: formObject
//     allCategories: Category[] | undefined
//     categoriesState: string[]
//     setCategoriesState: React.Dispatch<React.SetStateAction<string[]>>
//     allPlaces: Place[] | undefined
//     placesState: string[]
//     setPlacesState: React.Dispatch<React.SetStateAction<string[]>>
//     courtsState: string[]
//     setCourtsState: React.Dispatch<React.SetStateAction<string[]>>
// }

// type formObject = {
//     eventName: string
//     categoriesIds: string
//     placesIds: string
//     startDate: Date
//     finishDate: Date
//     timeOfFirstMatch: string
//     timeOfLastMatch: string
//     matchDurationInMinutes: string
//     eventType: EventType
// }

// const formSchema = z.object({
//     eventName: z.string(),
//     categoriesIds: z.string(),
//     placesIds: z.string(),
//     startDate: z.date(),
//     finishDate: z.date(),
//     timeOfFirstMatch: z.string(),
//     timeOfLastMatch: z.string(),
//     matchDurationInMinutes: z.string(),
//     eventType: z.enum(['ALLxALL', 'GROUPS']),
// })

// const EventForm: React.FC<EventFormProps> = ({
//     onSubmit,
//     defaultValues,
//     allCategories,
//     categoriesState,
//     setCategoriesState,
//     allPlaces,
//     placesState,
//     setPlacesState,
//     courtsState,
//     setCourtsState,
// }) => {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: defaultValues,
//     })

//     const { handleSubmit } = form

//     const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(
//         undefined
//     )
//     const [selectCourtsOn, setSelectCourtsOn] = useState<boolean>(false)

//     const { placeWithCourts } = useGetPlaceWithCourts(selectedPlaceId)

//     const addCategory = (id: string) => {
//         const stringArray: string[] = categoriesState.concat(id)
//         setCategoriesState(stringArray)
//     }

//     const removeCategory = (deleteId: string) => {
//         const stringArray: string[] = categoriesState.filter(
//             (id) => id !== deleteId
//         )
//         setCategoriesState(stringArray)
//     }

//     const addPlace = (id: string) => {
//         const stringArray: string[] = placesState.concat(id)
//         setPlacesState(stringArray)
//     }

//     const removePlace = (deleteId: string) => {
//         const stringArray: string[] = placesState.filter(
//             (id) => id !== deleteId
//         )
//         setPlacesState(stringArray)
//     }
//     const addCourt = (id: string) => {
//         const stringArray: string[] = courtsState.concat(id)
//         setCourtsState(stringArray)
//     }

//     const removeCourt = (deleteId: string) => {
//         const stringArray: string[] = courtsState.filter(
//             (id) => id !== deleteId
//         )
//         setCourtsState(stringArray)
//     }

//     return (
//         <Card className="p-8">
//             <Form {...form}>
//                 <FormField
//                     name="eventName"
//                     control={form.control}
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Event Name</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Event Name" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="categoriesIds"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Categories</FormLabel>
//                             <Select
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                             >
//                                 <div className="flex">
//                                     <FormControl>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select a category" />
//                                         </SelectTrigger>
//                                     </FormControl>
//                                     <div className="flex flex-row">
//                                         <SelectContent>
//                                             <SelectGroup>
//                                                 <SelectLabel>ALL</SelectLabel>
//                                                 {allCategories?.map(
//                                                     (c, index) => (
//                                                         <SelectItem
//                                                             value={c.id}
//                                                             key={index}
//                                                         >
//                                                             {c.level}
//                                                         </SelectItem>
//                                                     )
//                                                 )}
//                                             </SelectGroup>
//                                         </SelectContent>
//                                         <Button
//                                             className="flex items-center w-full rounded-tl-sm rounded-bl-sm "
//                                             onClick={() =>
//                                                 addCategory(field.value)
//                                             }
//                                         >
//                                             Add Category
//                                         </Button>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center justify-center">
//                                     <div className="flex-col justify-center w-1/3">
//                                         {categoriesState.map((categoryId) => {
//                                             const category =
//                                                 allCategories?.find(
//                                                     (cat) =>
//                                                         cat.id === categoryId
//                                                 )
//                                             if (category) {
//                                                 return (
//                                                     <Badge
//                                                         onClick={() =>
//                                                             removeCategory(
//                                                                 category.id
//                                                             )
//                                                         }
//                                                         key={category.id}
//                                                         className="justify-center cursor-pointer w-5 h-5 text-center rounded-full ml-1 mt-2 mr-0.5"
//                                                     >{`${category.level}`}</Badge>
//                                                 )
//                                             } else {
//                                                 return null
//                                             }
//                                         })}
//                                     </div>
//                                 </div>
//                             </Select>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="placesIds"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Places</FormLabel>
//                             <Select
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                             >
//                                 {selectCourtsOn ? (
//                                     <div className="flex flex-col items-center justify-center w-full">
//                                         <Card>
//                                             {placeWithCourts && (
//                                                 <CardHeader>
//                                                     <div className="flex flex-row">
//                                                         <CourtsByPlaceCheckbox
//                                                             placeCourts={
//                                                                 placeWithCourts.courts
//                                                             }
//                                                             addCourt={addCourt}
//                                                             removeCourt={
//                                                                 removeCourt
//                                                             }
//                                                             placeName={
//                                                                 placeWithCourts.name
//                                                             }
//                                                         />
//                                                         <Cross2Icon
//                                                             className="w-5 h-5 cursor-pointer"
//                                                             onClick={() => {
//                                                                 setSelectCourtsOn(
//                                                                     false
//                                                                 )
//                                                             }}
//                                                         />
//                                                     </div>
//                                                 </CardHeader>
//                                             )}
//                                             <CardFooter>
//                                                 <Button
//                                                     onClick={() => {
//                                                         addPlace(field.value)
//                                                         setSelectCourtsOn(false)
//                                                     }}
//                                                 >
//                                                     Add Place
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                     </div>
//                                 ) : (
//                                     <div className="flex">
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select a place" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             <SelectGroup>
//                                                 <SelectLabel>
//                                                     Places
//                                                 </SelectLabel>
//                                                 {allPlaces?.map((p, index) => (
//                                                     <SelectItem
//                                                         value={p.id}
//                                                         key={index}
//                                                     >
//                                                         {p.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectGroup>
//                                         </SelectContent>
//                                         <Button
//                                             className="flex items-center w-2/6 rounded-tl-sm rounded-bl-sm sm:w-3/12 md:w-1/6"
//                                             onClick={() => {
//                                                 if (field.value === '') {
//                                                     return
//                                                 }
//                                                 setSelectedPlaceId(field.value)
//                                                 setSelectCourtsOn(true)
//                                             }}
//                                         >
//                                             Courts
//                                         </Button>
//                                     </div>
//                                 )}
//                                 <div className="flex justify-center w-full">
//                                     <div className="flex flex-col items-center justify-center w-1/3 ">
//                                         {/* <p>Places registered</p> */}
//                                         {placesState.map((placeId) => {
//                                             const place = allPlaces?.find(
//                                                 (p) => p.id === placeId
//                                             )
//                                             if (place) {
//                                                 return (
//                                                     <Badge
//                                                         onClick={() =>
//                                                             removePlace(
//                                                                 place.id
//                                                             )
//                                                         }
//                                                         key={place.id}
//                                                         className="justify-center bg-slate-400 w-32 h-5 text-center rounded-full ml-1 mt-2 mr-0.5"
//                                                     >{`${place.name}`}</Badge>
//                                                 )
//                                             } else {
//                                                 // Handle the case where the category is not found
//                                                 return null // or you can render a default badge
//                                             }
//                                         })}
//                                     </div>
//                                 </div>
//                             </Select>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <div className="grid w-full grid-cols-1 mt-6 mb-6 sm:grid-cols-2 gap-x-6 gap-y-2">
//                     <FormField
//                         control={form.control}
//                         name="startDate"
//                         render={({ field }) => (
//                             <FormItem className="flex flex-col items-center w-full">
//                                 <FormLabel>First day</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <FormControl>
//                                             <Button
//                                                 variant={'outline'}
//                                                 className={cn(
//                                                     'w-full sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[340px] pl-3 text-left font-normal',
//                                                     !field.value &&
//                                                         'text-muted-foreground'
//                                                 )}
//                                             >
//                                                 {field.value ? (
//                                                     format(field.value, 'PPP')
//                                                 ) : (
//                                                     <span>Pick a date</span>
//                                                 )}
//                                                 <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
//                                             </Button>
//                                         </FormControl>
//                                     </PopoverTrigger>
//                                     <PopoverContent
//                                         className="w-auto p-0"
//                                         align="start"
//                                     >
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value}
//                                             onSelect={field.onChange}
//                                             initialFocus
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="finishDate"
//                         render={({ field }) => (
//                             <FormItem className="flex flex-col items-center w-full">
//                                 <FormLabel>Last day</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <FormControl>
//                                             <Button
//                                                 variant={'outline'}
//                                                 className={cn(
//                                                     'w-full sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[340px] pl-3 text-left font-normal',
//                                                     !field.value &&
//                                                         'text-muted-foreground'
//                                                 )}
//                                             >
//                                                 {field.value ? (
//                                                     format(field.value, 'PPP')
//                                                 ) : (
//                                                     <span>Pick a date</span>
//                                                 )}
//                                                 <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
//                                             </Button>
//                                         </FormControl>
//                                     </PopoverTrigger>
//                                     <PopoverContent
//                                         className="w-auto p-0"
//                                         align="start"
//                                     >
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value}
//                                             onSelect={field.onChange}
//                                             initialFocus
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>

//                 <FormField
//                     name="timeOfFirstMatch"
//                     control={form.control}
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>First game</FormLabel>
//                             <Select
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                             >
//                                 <FormControl>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select time" />
//                                     </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>
//                                             Select time for first match
//                                         </SelectLabel>
//                                         {timesForMatches.map((t, index) => (
//                                             <SelectItem
//                                                 value={t.value}
//                                                 key={index}
//                                             >
//                                                 {t.text}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     name="timeOfLastMatch"
//                     control={form.control}
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Last game</FormLabel>
//                             <Select
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                             >
//                                 <FormControl>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select time" />
//                                     </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Select time</SelectLabel>
//                                         {timesForMatches.map((t, index) => (
//                                             <SelectItem
//                                                 value={t.value}
//                                                 key={index}
//                                             >
//                                                 {t.text}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     name="matchDurationInMinutes"
//                     control={form.control}
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Match duration in minutes</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="60" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     name="eventType"
//                     control={form.control}
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Event type</FormLabel>
//                             <Select
//                                 onValueChange={field.onChange}
//                                 defaultValue={field.value}
//                             >
//                                 <FormControl>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select event type" />
//                                     </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Types</SelectLabel>
//                                         <SelectItem value={EventType.GROUPS}>
//                                             GROUPS
//                                         </SelectItem>
//                                         <SelectItem value={EventType.ALLxALL}>
//                                             All x all
//                                         </SelectItem>
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <div className="flex justify-center mt-4">
//                     <Button
//                         className="w-[100px] sm:w-1/6 bg-opacity-65"
//                         onClick={handleSubmit(onSubmit)}
//                         type="button"
//                     >
//                         Submit
//                     </Button>
//                 </div>
//             </Form>
//         </Card>
//     )
// }

// export default EventForm
