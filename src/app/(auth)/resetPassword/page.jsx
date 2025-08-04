        <>
            <div className="h-screen flex items-center justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Forgot Password / Reset Password
                        </CardTitle>
                        <CardDescription>
                            Enter your email below to get OTP.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button className="mt-6" onClick={handleForgetPassword}>
                                Send OTP
                                {loading && (
                                    <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* reset Password -> hiden*/}
            <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
                <DialogOverlay>
                    <DialogContent className="p-4 bg-black rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                        <div className="grid gap-4">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button type="submit" onClick={handleResetPassword}>
                                Submit
                                {loading && (
                                    <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                </DialogOverlay>
            </Dialog>

        </>