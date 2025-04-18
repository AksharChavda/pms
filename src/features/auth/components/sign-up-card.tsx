"use client";
import{
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Form,
    FormItem,
    FormField,

} from '@/components/ui/form';
import { DottedSeprator } from '@/components/dotted-seprator';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RegisterSchema } from '../schemas';
import { useRegister } from '../api/use-register';

export const SignUpCard = () => {
    const {mutate, isPending} = useRegister();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
        name: '',
        email: '',
        password: '',
    }});

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
            mutate({json: values});
    }

    return(
        <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
            <CardHeader className='flex items-center justify-center text-center'>
                <CardTitle className='text-2xl'>Sign Up</CardTitle>
            
            <CardDescription>
                By signing up, you agree to our{' '}
                <Link href='/privacy' ><span className='text-blue-700'>Privacy policy</span></Link>
            </CardDescription>
</CardHeader>
            <div className="px-7 mb-2"><DottedSeprator/></div>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                        <Input 
                            {...field}
                            type="text"
                            placeholder="Enter your name"
                        />
                        </FormItem>
                        )}
                />   

                    <FormField
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                        <Input 
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                        />
                        </FormItem>
                        )}/>   
                     
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
                        </FormItem>
                        )}
                />   
                    <Button disabled={isPending} size="lg"  className='w-full'>Register</Button>
                </form>     
                </Form>
            </CardContent >

            <div className="px-7"><DottedSeprator/></div>
           
            <CardContent className='p-7 flex items-center justify-center'>
                <p>Already have an account?
                <Link href="/sign-up">
                <span className='text-blue-700'>&nbsp;Sign In</span>
                </Link></p>
            </CardContent>
        </Card>
    );
};