"use client";
import{
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import {
    Form,
    FormItem,
    FormField,

} from '@/components/ui/form';
import { DottedSeprator } from '@/components/dotted-seprator';
import { LoginSchema } from '../schemas';
import { useLogin } from '../api/use-login';
import Link from 'next/link';

export const SignInCard = () => {
    const {mutate, isPending} = useLogin();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
        email: '',
        password: '',
    }});

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        mutate({json: values});
    }

    return(

        <Card className='w-full h-full md:w-[487px] border-none shadow-none'>

            <CardHeader className='flex items-center justify-center text-center p-7'>

                <CardTitle className='text-2xl'>Welcome</CardTitle>
            </CardHeader>
            <div className="px-7 mb-2"><DottedSeprator/></div>
            <CardContent>   
                <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                        <Input 
                            {...field}
                            type="email"
                            placeholder="Enter Email"
                        />
                        </FormItem>
                        )}
                />
                    
                <FormField
                    name="password"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                        <Input 
                            {...field}
                            
                            type="password"
                            placeholder="Enter pasword"
                        />
                </FormItem>)}
                />   
                     
                    <Button disabled={isPending} size="lg"  className='w-full'>Login</Button>
                </form> 
                </Form>    
            </CardContent >
            <div className="px-7"><Separator/></div>
           
            <CardContent className='p-7 flex items-center justify-center'>
                <p>Dont have an account?
                <Link href="/sign-up">
                <span className='text-blue-700'>&nbsp;Sign Up</span>
                </Link></p>
            </CardContent>
        </Card>
    );
};