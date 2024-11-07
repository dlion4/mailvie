/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PasswordResetPasswordResetLinkImport } from './routes/password-reset/$passwordResetLink'

// Create Virtual Routes

const SignupLazyImport = createFileRoute('/signup')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SignupLazyRoute = SignupLazyImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PasswordResetPasswordResetLinkRoute =
  PasswordResetPasswordResetLinkImport.update({
    id: '/password-reset/$passwordResetLink',
    path: '/password-reset/$passwordResetLink',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/password-reset/$passwordResetLink': {
      id: '/password-reset/$passwordResetLink'
      path: '/password-reset/$passwordResetLink'
      fullPath: '/password-reset/$passwordResetLink'
      preLoaderRoute: typeof PasswordResetPasswordResetLinkImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/signup': typeof SignupLazyRoute
  '/password-reset/$passwordResetLink': typeof PasswordResetPasswordResetLinkRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/signup': typeof SignupLazyRoute
  '/password-reset/$passwordResetLink': typeof PasswordResetPasswordResetLinkRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/signup': typeof SignupLazyRoute
  '/password-reset/$passwordResetLink': typeof PasswordResetPasswordResetLinkRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/signup' | '/password-reset/$passwordResetLink'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/signup' | '/password-reset/$passwordResetLink'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/signup'
    | '/password-reset/$passwordResetLink'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  SignupLazyRoute: typeof SignupLazyRoute
  PasswordResetPasswordResetLinkRoute: typeof PasswordResetPasswordResetLinkRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  SignupLazyRoute: SignupLazyRoute,
  PasswordResetPasswordResetLinkRoute: PasswordResetPasswordResetLinkRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/signup",
        "/password-reset/$passwordResetLink"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/signup": {
      "filePath": "signup.lazy.tsx"
    },
    "/password-reset/$passwordResetLink": {
      "filePath": "password-reset/$passwordResetLink.tsx"
    }
  }
}
ROUTE_MANIFEST_END */